import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Input } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import Loading from "../../../_component/Loading/Loading";

import { getListUser, searchUser } from "../../../redux/actions/User";
import { deleteUser } from "../../../redux/actions/User";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function UserManagement() {

  const columns = [
    {
      title: "User ID",
      key: "userId",
      dataIndex: "userId",
      sorter: {
        compare: (a, b) => a.userId - b.userId,
      },
      render: (text, user) => (<span>{user?.userId}</span>)
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, user) => (
        <Fragment>
          <img className="rounded-full lg:w-8 md:w-8" src={user?.avatar} alt="" />
        </Fragment>
      ),
      width: '6rem',
      responsive: ['lg']
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
      },
      render: (text, user) => (<span>{user?.email}</span>),
      responsive: ['sm']
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      render: (text, user) => (<span>{user?.name}</span>)
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: {
        compare: (a, b) => a.phoneNumber - b.phoneNumber,
      },
      render: (text, user) => (<span>{user?.phoneNumber.substr(0, 10)}</span>)
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text, user) => (
        <div className='flex items-center gap-4'>
          <NavLink
            to={`/edituser/${user.userId}`}
            className="text-blue-500 text-xl"
          >
            <EditOutlined />
          </NavLink>
          <button
            className="text-red-500 text-xl focus:outline-none"
            onClick={() => {
              delete_User(user.userId);
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  //GET LIST USER
  const { listUser, loading } = useSelector((state) => state.getListUser_Reducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const data = listUser;

  function onChange(pagination, sorter, extra) {
    console.log("params", pagination, sorter, extra);
  }

  //DELETE USER
  const delete_User = (id) => {
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
        dispatch(deleteUser(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //SEARCH USER
  const { Search } = Input;
  const onSearch = (value) => dispatch(searchUser(value))

  return (
    <div className="user container-fluid p-5 md:ml-14 lg:ml-80">
      {loading ? <Loading /> : ''}
      <div className="flex items-center gap-3 mb-4">
        <UserOutlined className="text-xl" />
        <span className="text-3xl font-medium">User Management</span>
      </div>

      <Search
        className="mb-4"
        placeholder="search user"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} bordered onChange={onChange} />
    </div>
  );
}
