const initState = null;
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ERROR":
      return action.payload;
    case "HIDE_ERROR":
      return null;
    default:
      return state;
  }
};
export default userReducer;
