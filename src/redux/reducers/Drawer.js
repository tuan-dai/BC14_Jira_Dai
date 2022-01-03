const initialState = {
  visible: true,
  project: null,
};

const Drawer_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_DRAWER": {
      return { ...state, visible: true, project: action.project };
    }
    case "CLOSE_DRAWER": {
      return { ...state, visible: false };
    }
    default:
      return { ...state };
  }
};
export default Drawer_Reducer;
