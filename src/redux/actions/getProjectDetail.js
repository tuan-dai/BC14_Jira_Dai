import api from "../../util/apiUtil";
import *as ActionType from '../types/getProjectDetail'

//GET PROJECT DETAIL
export const getProjectDetail = (id) => {
    return (dispatch) => {
        dispatch(actGetProjectDetail_Request());
        api
            .get(`Project/getProjectDetail?id=${id}`)
            .then((result) => dispatch(actGetProjectDetail_Success(result.data.content)))
            .catch((error) => dispatch(actGetProjectDetail_Error(error)));
    };
};

const actGetProjectDetail_Request = () => {
    return {
        type: ActionType.GETPROJECTDETAIL_REQUEST,
    };
};

const actGetProjectDetail_Success = (projectDetail) => {
    return {
        type: ActionType.GETPROJECTDETAIL_SUCCESS,
        payload: projectDetail,
    };
};

const actGetProjectDetail_Error = (error) => {
    return {
        type: ActionType.GETPROJECTDETAIL_ERROR,
        payload: error,
    };
};