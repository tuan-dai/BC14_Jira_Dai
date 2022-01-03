import api from "../../util/apiUtil";
import * as ActionType from "../types/User";
import Swal from "sweetalert2";

//  GET LIST USER
export const getListUser = () => {
  return (dispatch) => {
    dispatch(actGetListUser_Request);
    api
      .get(`Users/getUser`)
      .then((result) => dispatch(actGetListUser_Success(result.data.content)))
      .catch((error) => dispatch(actGetListUser_Error(error)));
  };
};

//GET USER BY PROJECTID
export const getUserProjectId = (id) => {
  return (dispatch) => {
    dispatch(actGetListUser_Request);
    api
      .get(`Users/getUserByProjectId?idProject=${id}`)
      .then((result) => dispatch(actGetUserProjectId(result.data.content)))
      .catch((error) => dispatch(actGetListUser_Error(error)));
  };
};


//DELETE USER
export const deleteUser = (id) => {
  return (dispatch) => {
    api
      .delete(`Users/deleteUser?id=${id}`)
      .then((result) => {
        dispatch(actDeleteUser_Success(result.data.content.content));
        dispatch(getListUser());
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.content,
        });
      });
  };
};


// SEARCH USER
export const searchUser = (keyword) => {
  return (dispatch) => {
    api
      .get(`Users/getUser?keyword=${keyword}`)
      .then((result) => dispatch(actSearchUser_Success(result.data.content)))
      .catch((error) => console.log(error));
  };
};

// EDIT USER
export const editUser = (user, history) => {
  return (dispatch) => {
    api
      .put("Users/editUser", user)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Editted account succefully",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(actEditUser(result.data.content.content));
        setTimeout(() => history.push("/usermanagement"), 2000);
      })
      .catch((error) => console.log(error));
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

const actDeleteUser_Success = (user) => {
  return {
    type: ActionType.DELETE_USER,
    payload: user,
  };
};

const actSearchUser_Success = (user) => {
  return {
    type: ActionType.SEARCH_USER,
    payload: user,
  };
};

const actEditUser = (user) => {
  return {
    type: ActionType.EDIT_USER,
    payload: user,
  };
};

const actGetListUser_Error = (error) => {
  return {
    type: ActionType.LISTUSER_ERROR,
    payload: error,
  };
};

const actGetUserProjectId = (data) => {
  return {
    type: ActionType.USER_PROJECTID,
    payload: data,
  };
};
