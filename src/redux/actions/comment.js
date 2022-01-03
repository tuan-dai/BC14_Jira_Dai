import api from "../../util/apiUtil";
import *as ActionType from '../types/comment'
import { getTaskDetail } from '../actions/Task'
import Swal from "sweetalert2";


//INSERT COMMENT
export const insertComment = (comment, taskId) => {
    return (dispatch) => {
        api
            .post(`Comment/insertComment`, comment)
            .then(result => {
                dispatch(actInsertComment(result.data.content.content))
                dispatch(getTaskDetail(taskId))
            })
            .catch(error => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            }))
    }
}

//UPDATE COMMENT
export const updateComment = (comment, id, taskId) => {
    return (dispatch) => {
        api
            .put(`Comment/updateComment?id=${id}&contentComment=${comment}`)
            .then(result => {
                dispatch(actUpdateComment(result.data.content.content))
                dispatch(getTaskDetail(taskId))
            })
            .catch(error => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            }))
    }
}

//DELETE COMMENT
export const deleteComment = (id, taskId) => {
    return (dispatch) => {
        api
            .delete(`Comment/deleteComment?idComment=${id}`)
            .then(result => {
                dispatch(actDeleteComment(result.data.content.content))
                dispatch(getTaskDetail(taskId))
            })
            .catch(error => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            }))
    }
}

const actInsertComment = (comment) => {
    return {
        type: ActionType.INSERT_COMMENT,
        comment
    }
}

const actUpdateComment = (comment) => {
    return {
        type: ActionType.UPDATE_COMMENT,
        comment
    }
}

const actDeleteComment = (comment) => {
    return {
        type: ActionType.DELETE_COMMENT,
        comment
    }
}

