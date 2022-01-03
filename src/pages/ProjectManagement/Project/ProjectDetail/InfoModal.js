import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllTaskType, removeTask } from "../../../../redux/actions/Task";
import Description from "./Description";
import Assigness from "./Assigness";
import Comment from "./Comment";
import Priority from "./Priority";
import Status from "./Status";
import TimeTracking from "./TimeTracking";
import Swal from "sweetalert2";
import { getProjectDetail } from "../../../../redux/actions/getProjectDetail";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";

export default function InfoModal() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTaskType());
    dispatch(getProjectDetail(taskDetail?.projectId))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { taskDetail } = useSelector((state) => state.Task_Reducer);
  const { taskType } = useSelector((state) => state.Task_Reducer);
  const { projectDetail } = useSelector(state => state.getProjectDetail_Reducer)

  console.log(projectDetail)


  const myRef = useRef(null)

  const renderTaskType = () => {
    return taskType?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.taskType}
        </option>
      );
    });
  };


  const renderReporter = () => {
    return taskDetail?.assigness?.map((assign, index) => {
      return (
        <option key={index} value={assign?.id}>
          {assign?.name}
        </option>
      );
    });
  };


  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">

          {/* HEADER */}
          <div className="ml-4 mt-3 grid sm:grid-cols-1 md:grid-cols-2 md:justify-between relative">
            <div className="flex items-center mt-1 mb-2">
              <select className="bg-gray-100 px-2 focus:outline-none py-1"
                value={taskDetail?.taskTypeDetail?.taskType}>{renderTaskType()}
              </select>
              <div className="px-3 py-1">
                <i className="fa fa-check-square"></i>
                <span className="ml-2">{taskDetail?.taskName}</span>
              </div>
            </div>

            <div className="flex items-center md:absolute right-6">
              <div className="flex items-center gap-2">
                <i className="fab fa-telegram-plane" />
                <span>Give feedback</span>
              </div>
              <div className="flex items-center gap-2 mx-3">
                <i className="fa fa-link" />
                <span>Copy link</span>
              </div>

              <span className="cursor-pointer text-lg mb-2 mr-2" onClick={() => {
                Swal.fire({
                  title: "Are you sure you want to delete this task?",
                  text: "Once you delete, it's gone for good.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Delete task",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(removeTask(taskDetail?.taskId, taskDetail.projectId))
                    myRef.current.click()
                    Swal.fire("Deleted!", "Your task has been deleted.", "success");
                  }
                })
              }}>
                <DeleteOutlined />
              </span>

              <button
                type="button"
                className="close cursor-pointer focus:outline-none"
                data-dismiss="modal"
                aria-label="Close"
                ref={myRef}
              >
                <span aria-hidden="true">×</span>
              </button>

            </div>
          </div>

          {/* BODY */}
          <div className="container">
            <div className="grid sm:grid-cols-2 sm:gap-0 md:grid-cols-3 md:gap-10 my-3">
              <div className="md:col-span-2 mx-2">
                <p className="text-2xl font-medium">
                  {projectDetail?.projectName}
                </p>

                {/* DESCRIPTION */}
                <Description />

                {/* COMMENT */}
                <Comment />
              </div>
              <div className="mx-2">

                {/* STATUS */}
                <Status />

                {/* ASSIGNEES */}
                <Assigness />

                {/* REPORTER */}
                <div className="mb-4">
                  <p className="text-md text-gray-700 font-medium -mb-0">REPORTER</p>
                  <select className="text-md bg-gray-200 p-2 rounded-sm focus:outline-none">
                    {renderReporter()}
                  </select>
                </div>

                {/* PRIORITY */}
                <Priority />

                {/* TIME TRACKING */}
                <TimeTracking />
                <div className="text-gray-400 text-sm">
                  Create at a month ago
                </div>
                <div className="text-gray-400 text-sm">
                  Update at a few seconds ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
