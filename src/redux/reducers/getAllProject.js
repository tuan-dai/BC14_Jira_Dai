import * as ActionType from "../types/Project";
const initialState = {
  loading: false,
  listProject: null,
  keyword: '',
  error: null,
};

const getAllProject_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GETALLPROJECT_REQUEST: {
      state.loading = true;
      state.listProject = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETALLPROJECT_SUCCESS: {
      state.loading = false;
      state.listProject = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETALLPROJECT_ERROR: {
      state.loading = false;
      state.listProject = null;
      state.error = action.payload;
      return { ...state };
    }

    case ActionType.CREATEPROJECT: {
      state.loading = false;
      state.listProject = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.EDITPROJECT: {
      state.loading = false;
      state.listProject = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.DELETEPROJECT: {
      state.loading = false;
      state.listProject = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.REMOVE_USERPROJECT: {
      return { ...state, listProject: action.payload }
    }

    case ActionType.ASSIGN_USERPROJECT: {
      return { ...state, listProject: action.payload }
    }

    case ActionType.SEARCHPROJECT: {
      return { ...state, keyword: action.value }
    }

    default:
      return { ...state };
  }
};
export default getAllProject_Reducer;
