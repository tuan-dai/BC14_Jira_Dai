import { USERLOGIN } from "../types/signin";

const initialState = {
  user: {},
};

const userLogin_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERLOGIN:
      state.user = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default userLogin_Reducer;
