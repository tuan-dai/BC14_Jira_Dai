import *as ActionType from '../types/getProjectDetail'

const initialState = {
    loading: false,
    projectDetail: null,
    error: null,
}

const getProjectDetail_Reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.GETPROJECTDETAIL_REQUEST: {
            state.loading = true;
            state.projectDetail = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.GETPROJECTDETAIL_SUCCESS: {
            state.loading = false;
            state.projectDetail = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.GETPROJECTDETAIL_ERROR: {
            state.loading = false;
            state.projectDetail = null;
            state.error = action.payload;
            return { ...state };
        }

        default:
            return { ...state }
    }
}
export default getProjectDetail_Reducer
