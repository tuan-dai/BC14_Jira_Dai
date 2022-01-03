import * as ActionType from "../types/Task";

const initialState = {
  _status: null,
  priority: null,
  description: null,
  time: null,
  taskType: null,
  userTask: null,
  task: null,
  newTask: null,
  taskDetail: {
    priorityTask: {
      priorityId: 1,
      priority: "High"
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug"
    },
    assigness: [
      {
        id: 827,
        avatar: "https://ui-avatars.com/api/?name=Tien Do13213",
        name: "Tien Do13213",
        alias: "tien-do"
      }]
    ,
    lstComment: [],
    taskId: 2048,
    taskName: "hello",
    alias: "hello",
    description: "",
    statusId: "3",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    typeId: 1,
    priorityId: 1,
    projectId: 2344
  },
};

const Task_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GETALLSTATUS: {
      return { ...state, _status: action._status };
    }

    case ActionType.UPDATESTATUS: {
      return { ...state, _status: action._status };
    }

    case ActionType.GETALLPRIORITY: {
      return { ...state, priority: action.priority };
    }

    case ActionType.UPDATEPRIORITY: {
      return { ...state, priority: action.priority };
    }

    case ActionType.UPDATE_TIMETRACKING: {
      return { ...state, time: action.time }
    }

    case ActionType.GETALLTASKTYPE: {
      return { ...state, taskType: action.taskType };
    }

    case ActionType.ASSIGN_USERTASK: {
      return { ...state, userTask: action.userTask };
    }

    case ActionType.CREATETASK: {
      return { ...state, newTask: action.newTask };
    }

    case ActionType.GETTASKDETAIL: {
      return { ...state, taskDetail: action.taskDetail };
    }

    case ActionType.UPDATETASK: {
      return { ...state, taskDetail: action.taskDetail }
    }

    default:
      return { ...state };
  }
};
export default Task_Reducer;
