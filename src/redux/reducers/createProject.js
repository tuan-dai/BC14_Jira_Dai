import { CREATEPROJECT } from "../types/createProject";

const initialState = {
  data: null,
};

const createProject_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATEPROJECT: {
      state.data = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default createProject_Reducer;
