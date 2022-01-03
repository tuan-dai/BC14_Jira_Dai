import api from "../../util/apiUtil";
import { SIGN_UP } from "../types/signup";
import Swal from "sweetalert2";

export const signUp = (userInfo, myRef) => {
  return (dispatch) => {
    api
      .post("Users/signup", userInfo)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congratulations, your account have been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(actSIGN_UP(result.data.content));
        myRef.current.click();
      })
      .catch((error) => {
        const mess = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: mess,
        });
      });
  };
};

const actSIGN_UP = (userInfo) => {
  return {
    type: SIGN_UP,
    payload: userInfo,
  };
};
