import api from "../../util/apiUtil";
import * as ActionType from "../types/User";

export const getListUser = () => {
  return (dispatch) => {
    dispatch(actGetListUser_Request);
    api
      .get(`Users/getUser`)
      .then((result) => dispatch(actGetListUser_Success(result.data.content)))
      .catch((error) => dispatch(actGetListUser_Error(error)));
  };
};

const actGetListUser_Request = () => {
  return {
    type: ActionType.LISTUSER_REQUEST,
  };
};

const actGetListUser_Success = (listUser) => {
  return {
    type: ActionType.LISTUSER_SUCCESS,
    payload: listUser,
  };
};

const actGetListUser_Error = (error) => {
  return {
    type: ActionType.LISTUSER_ERROR,
    payload: error,
  };
};
