import api from "../../util/apiUtil";
import { PROJECTCATAGORY } from "../types/projectCatagory";

export const getProjectCatagory = () => {
    return (dispatch) => {
        api
            .get('ProjectCategory')
            .then(result => dispatch(actProjectCatagory(result.data.content)))
            .catch(error => console.log(error))
    }
}

const actProjectCatagory = (data) => {
    return {
        type: PROJECTCATAGORY,
        payload: data
    }
}