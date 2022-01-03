import api from "../../util/apiUtil";
import * as ActionType from "../types/Task";
import { getProjectDetail } from "./getProjectDetail";
import Swal from "sweetalert2";


//GET ALL STATUS
export const getAllStatus = () => {
  return (dispatch) => {
    api
      .get("/Status/getAll")
      .then((result) => dispatch(actGetAllStatus(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//UPDATE STATUS
export const updateStatus = (_status, projectId, taskId) => {
  return (dispatch) => {
    api
      .put("Project/updateStatus", _status)
      .then((result) => {
        dispatch(actUpdateStatus(result.data.content.content));
        dispatch(getProjectDetail(projectId));
        dispatch(getTaskDetail(taskId))
        dispatch(getAllStatus())
      })
      .catch((error) => console.log(error));
  };
};

//GET ALL PRIORITY
export const getAllPriority = () => {
  return (dispatch) => {
    api
      .get("Priority/getAll")
      .then((result) => dispatch(actGetAllPriority(result.data.content)))
      .catch((error) => console.log(error));
  };
};


//GET ALL TASKTYPE
export const getAllTaskType = () => {
  return (dispatch) => {
    api
      .get("TaskType/getAll")
      .then((result) => dispatch(actGetAllTaskType(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//ASSIGN USER TASK
export const assignUserTask = (userTask, taskId) => {
  return (dispatch) => {
    api
      .post("Project/assignUserTask", userTask)
      .then((result) => {
        dispatch(actAssignUserTask(result.data.content.content))
        dispatch(getTaskDetail(taskId))
      })
      .catch((error) => console.log(error));
  };
};

//REMOVE USER TASK
export const removeUserTask = (userTask, taskId) => {
  return (dispatch) => {
    api
      .post("Project/removeUserFromTask", userTask)
      .then((result) => {
        dispatch(actRemoveUserTask(result.data.content.content))
        dispatch(getTaskDetail(taskId))
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };
};

//CREATE TASK
export const createTask = (newTask, history) => {
  return (dispatch) => {
    api
      .post("Project/createTask", newTask)
      .then((result) => {
        dispatch(actCreateTask(result.data.content.content))
        setTimeout(() => history.push("/project"), 2000)
      })
      .catch((error) => console.log(error.response.message));
  };
};

//GET TASK DETAIL
export const getTaskDetail = (id) => {
  return (dispatch) => {
    api
      .get(`Project/getTaskDetail?taskId=${id}`)
      .then((result) => dispatch(actGetTaskDetail(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//UPDATE TASK
export const updateTask = (taskDetail, taskId) => {
  return (dispatch) => {
    api
      .post("Project/updateTask", taskDetail)
      .then((result) => {
        dispatch(actUpdateTask(result.data.content.content))
        dispatch(getTaskDetail(taskId))
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };
};

//REMOVE TASK
export const removeTask = (id, projectId) => {
  return (dispatch) => {
    api
      .delete(`Project/removeTask?taskId=${id}`)
      .then((result) => {
        dispatch(actRemoveTask(result.data.content.content))
        dispatch(getProjectDetail(projectId))
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };
};

const actGetAllStatus = (_status) => {
  return {
    type: ActionType.GETALLSTATUS,
    _status,
  };
};

const actUpdateStatus = (_status) => {
  return {
    type: ActionType.UPDATESTATUS,
    _status,
  };
};

const actGetAllPriority = (priority) => {
  return {
    type: ActionType.GETALLPRIORITY,
    priority,
  };
};


const actGetAllTaskType = (taskType) => {
  return {
    type: ActionType.GETALLTASKTYPE,
    taskType,
  };
};

const actAssignUserTask = (userTask) => {
  return {
    type: ActionType.ASSIGN_USERTASK,
    userTask,
  };
};

const actRemoveUserTask = (userTask) => {
  return {
    type: ActionType.REMOVE_USERTASK,
    userTask,
  };
};

const actCreateTask = (newTask) => {
  return {
    type: ActionType.CREATETASK,
    newTask
  };
};

const actGetTaskDetail = (taskDetail) => {
  return {
    type: ActionType.GETTASKDETAIL,
    taskDetail,
  };
};

const actUpdateTask = (taskDetail) => {
  return {
    type: ActionType.UPDATETASK,
    taskDetail,
  };
};

const actRemoveTask = (task) => {
  return {
    type: ActionType.REMOVETASK,
    task,
  };
};
