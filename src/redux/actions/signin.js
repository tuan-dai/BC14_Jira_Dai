import { USERLOGIN } from "../types/signin";
import api from "../../util/apiUtil";
import Swal from "sweetalert2";

export const userLogin = (user, history) => {
  return (dispatch) => {
    api
      .post("Users/signin", user)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(actUSERLOGIN(result.data));

        //luu xuong localStorage
        localStorage.setItem("USER_LOGIN", JSON.stringify(result.data));

        //chuyen huong sang trang mainboard
        setTimeout(() => history.replace("/project"), 2000);
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

const actUSERLOGIN = (user) => {
  return {
    type: USERLOGIN,
    payload: user,
  };
};
