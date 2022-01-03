import { SIGN_UP } from "../types/signup";

const initialState = {
  data: null,
};

const signUp_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      state.data = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default signUp_Reducer;
