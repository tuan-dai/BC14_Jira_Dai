import * as ActionType from "../types/Project";
import api from "../../util/apiUtil";
import Swal from "sweetalert2";

// GET ALL PROJECT
export const getAllProject = () => {
  return (dispatch) => {
    dispatch(actGetAllProject_Request());
    api
      .get("Project/getAllProject")
      .then((result) => dispatch(actGetAllProject_Success(result.data.content)))
      .catch((error) => dispatch(actGetAllProject_Error(error)));
  };
};


// CREATE PROJECT
export const createProject = (project, history) => {
  return (dispatch) => {
    api
      .post('Project/createProjectAuthorize', project)
      .then(result => {
        dispatch(actCreateProject(result.data.content))
        dispatch(getAllProject());
        setTimeout(() => history.push("/project"), 2000);
      })
      .catch(error => console.log(error))
  }
}

// EDIT PROJECT
export const editProject = (id, project, history) => {
  return (dispatch) => {
    api
      .put(`Project/updateProject?projectId=${id}`, project)
      .then(result => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Editted project succefully",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(actEditProject(result.data.content.content))
        history.push('/project')
        dispatch(getAllProject())
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      }))
  }
}

// DELETE PROJECT
export const deleteProject = (id) => {
  return (dispatch) => {
    api
      .delete(`Project/deleteProject?projectId=${id}`)
      .then((result) => {
        dispatch(actDeleteProject(result.data.content));
        dispatch(getAllProject());
      })
      .catch((error) => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      }));
  };
};

//SEARCH PROJECT
export const searchProject = (keyword) => {
  return (dispatch) => {
    api
      .get(`Project/getAllProject?keyword=${keyword}`)
      .then(result => dispatch(actSearchProject(result.data.content)))
      .catch(error => console.log(error))
  }
}

// REMOVE USER FROM PROJECT
export const removeUserFromProject = (project) => {
  return (dispatch) => {
    api
      .post('Project/removeUserFromProject', project)
      .then(result => {
        dispatch(actRemoveUserProject(result.data.content.content))
        dispatch(getAllProject())
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      }))
  }
}

// ASSING USER PROJECT
export const assignUserProject = (userProject) => {
  return (dispatch) => {
    api
      .post('Project/assignUserProject', userProject)
      .then(result => {
        dispatch(actAssignUserProject(result.data.content.content))
        dispatch(getAllProject())
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      }))
  }
}

const actGetAllProject_Request = () => {
  return {
    type: ActionType.GETALLPROJECT_REQUEST,
  };
};

const actGetAllProject_Success = (data) => {
  return {
    type: ActionType.GETALLPROJECT_SUCCESS,
    payload: data,
  };
};

const actGetAllProject_Error = (error) => {
  return {
    type: ActionType.GETALLPROJECT_ERROR,
    payload: error,
  };
};

const actCreateProject = (project) => {
  return {
    type: ActionType.CREATEPROJECT,
    payload: project
  }
}

const actEditProject = (project) => {
  return {
    type: ActionType.EDITPROJECT,
    payload: project
  }
}

const actDeleteProject = (project) => {
  return {
    type: ActionType.DELETEPROJECT,
    payload: project,
  };
};

const actSearchProject = (project) => {
  return {
    type: ActionType.SEARCHPROJECT,
    payload: project
  }
}

const actRemoveUserProject = (userProject) => {
  return {
    type: ActionType.REMOVE_USERPROJECT,
    payload: userProject
  }
}

const actAssignUserProject = (userProject) => {
  return {
    type: ActionType.ASSIGN_USERPROJECT,
    payload: userProject
  }
}