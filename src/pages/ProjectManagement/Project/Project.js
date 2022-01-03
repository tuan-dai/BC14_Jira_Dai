import { Fragment, React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  deleteProject,
  removeUserFromProject,
  assignUserProject,
  searchProject,
} from "../../../redux/actions/getAllProject";
import Swal from "sweetalert2";
import Loading from "../../../_component/Loading/Loading";

import { Table, Input, Tag, Popover, Button, AutoComplete, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, ProfileOutlined } from "@ant-design/icons";
import { getListUser, searchUser } from "../../../redux/actions/User";
import { NavLink } from "react-router-dom";

export default function Project() {

  const [value, setState] = useState("");
  const searchRef = useRef(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getListUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { listProject, loading } = useSelector((state) => state.getAllProject_Reducer);
  const { listUser } = useSelector((state) => state.getListUser_Reducer);

  const data = listProject

  console.log(listProject)

  //TABLE
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: {
        compare: (a, b) => a.projectName.localeCompare(b.projectName),
      },
      render: (text, project) => (
        <NavLink to={`/projectdetail/${project.id}`}> {project?.projectName}</NavLink >
      ),
    },
    {
      title: "Catagory",
      dataIndex: "categoryName",
      sorter: {
        compare: (a, b) => a.categoryName.localeCompare(b.categoryName),
      },
      responsive: ['sm']
    },
    {
      title: "Creator",
      key: "creator",
      sorter: {
        compare: (a, b) => a.creator?.name.localeCompare(b.creator?.name),
      },
      render: (text, project) => (
        <Tag color="volcano">{project?.creator?.name}</Tag>
      ),
      responsive: ['sm']
    },
    {
      title: "Member",
      key: "member",
      render: (text, project) => (
        <div>
          {project?.members?.slice(0, 3).map((member) => {
            return (
              <Popover
                key={member.userId}
                placement="bottom"
                title="Members"
                content={() => {
                  return (
                    <Fragment>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project?.members?.map((member) => {
                            return (
                              <tr key={member.userId}>
                                <td>{member.userId}</td>
                                <td>
                                  <Avatar src={member.avatar} />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <Button
                                    type="primary" danger shape="circle"
                                    onClick={() => {
                                      dispatch(removeUserFromProject({
                                        projectId: project?.id,
                                        userId: member?.userId,
                                      }));
                                    }}
                                  >X</Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Fragment>
                  );
                }}
                trigger="hover">
                <Avatar className="mr-1" src={member.avatar} />
              </Popover>
            );
          })}
          {project?.members?.length > 3
            ? (<Avatar className="mr-1">...</Avatar>)
            : ("")}
          <Popover
            placement="rightTop"
            title="Add User"
            content={() => {
              return (
                <AutoComplete
                  style={{ width: 200 }}
                  value={value}
                  onSearch={(value) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current)
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch(searchUser(value))
                    }, 500)
                  }}
                  options={listUser?.map((user) => {
                    return { label: user.name, value: user.userId.toString() };
                  })}
                  onChange={(value) => setState(value)}
                  onSelect={(value, option) => {
                    setState(option.label);
                    dispatch(
                      assignUserProject({
                        projectId: project?.id,
                        userId: Number(value),
                      })
                    );
                  }}
                />
              );
            }}
            trigger="click">
            <Button type="primary" shape="circle">+</Button>
          </Popover>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, project) => (
        <Fragment>
          <NavLink to={`/editproject/${project?.id}`}
            className="text-blue-500 text-xl mr-3 "
          >
            <EditOutlined />
          </NavLink>
          <button
            className="text-red-500 text-xl focus:outline-none border-none"
            onClick={() => { delete_Project(project.id); }}
          >
            <DeleteOutlined />
          </button>
        </Fragment>
      ),
    },
  ];

  function onChange(pagination, sorter, extra) {
    console.log("params", pagination, sorter, extra);
  }

  //DELETE PROJECT
  const delete_Project = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProject(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //SEARCH PROJECT
  const { Search } = Input;

  return (
    <div className="project w-full p-5">
      {loading ? <Loading /> : ""}
      <div className="flex items-center gap-3 mb-4">
        <ProfileOutlined className="text-xl" />
        <span className="text-3xl font-medium">Project Management</span>
      </div>

      <Search
        className="mb-4"
        placeholder="input project name"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={value => dispatch(searchProject(value))}
      />

      <Table columns={columns} dataSource={data} bordered onChange={onChange} />
    </div>
  );
}
