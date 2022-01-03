import { PROJECTCATAGORY } from "../types/projectCatagory";

const initialState = {
    data: null
}

const ProjectCategory_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECTCATAGORY: {
            state.data = action.payload
            return { ...state }
        }

        default:
            return { ...state };
    }
}

export default ProjectCategory_Reducer