import api from "../../util/apiUtil";
import { CREATEPROJECT } from '../types/createProject'
import Swal from "sweetalert2";


export const createProject = (project, history) => {
    return (dispatch) => {
        api
            .post('Project/createProjectAuthorize', project)
            .then(result => {
                dispatch(actCreateProject(result.data.content))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your have create project successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => history.push("/project"), 2000);
            })
            .catch((error) => {
                const mess = error.response.data.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: mess,
                });
            });
    }
}

const actCreateProject = (project) => {
    return {
        type: CREATEPROJECT,
        payload: project
    }
}