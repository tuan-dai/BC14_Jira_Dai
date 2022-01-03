import * as ActionType from "../types/User";

const initialState = {
  loading: false,
  listUser: null,
  userProjectId: null,
  userInfo: null,
  error: null,
};

const getListUser_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LISTUSER_REQUEST: {
      state.loading = true;
      state.listUser = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.LISTUSER_SUCCESS: {
      state.loading = false;
      state.listUser = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.USER_PROJECTID: {
      return { ...state, userProjectId: action.payload }
    }

    case ActionType.DELETE_USER: {
      state.loading = false;
      state.listUser = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.SEARCH_USER: {
      state.loading = false;
      state.listUser = action.payload;

      let [_userInfo] = action.payload;
      state.userInfo = _userInfo;
      state.error = null;
      return { ...state };
    }
    case ActionType.EDIT_USER: {
      state.loading = false;
      state.listUser = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.LISTUSER_ERROR: {
      state.loading = false;
      state.listUser = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default getListUser_Reducer;
