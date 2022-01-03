import *as ActionType from '../types/comment'
const initialState = {
    comment: [
        {
            alias: "kinh doanh",
            contentComment: "kinh doanh",
            deleted: false,
            id: 2288,
            taskId: 2099,
            user: { userId: 842, name: 'kaka', avatar: 'https://ui-avatars.com/api/?name=kaka' },
            userId: 842
        }
    ],
}

const Comment_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.INSERT_COMMENT: {
            return { ...state, comment: action.comment }
        }

        case ActionType.UPDATE_COMMENT: {
            return { ...state, comment: action.comment }
        }

        case ActionType.DELETE_COMMENT: {
            return { ...state, comment: action.comment }
        }

        default:
            return { ...state }
    }
}
export default Comment_Reducer