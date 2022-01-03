import { combineReducers } from "redux";
import getAllProject_Reducer from "../redux/reducers/getAllProject";
import getProjectDetail_Reducer from "../redux/reducers/getProjectDetail";
import userLogin_Reducer from "../redux/reducers/signin";
import signUp_Reducer from "./reducers/signup";
import ProjectCategory_Reducer from "./reducers/getProjectCatagory";
import getListUser_Reducer from "./reducers/User";
import Drawer_Reducer from "./reducers/Drawer";
import Task_Reducer from "./reducers/Task";
import Comment_Reducer from "./reducers/comment";

const rootReducer = combineReducers({
  getAllProject_Reducer,
  getProjectDetail_Reducer,
  userLogin_Reducer,
  signUp_Reducer,
  ProjectCategory_Reducer,
  getListUser_Reducer,
  Drawer_Reducer,
  Task_Reducer,
  Comment_Reducer,
});
export default rootReducer;
