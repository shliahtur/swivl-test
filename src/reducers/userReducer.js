const initState = {};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USER_DETAIL":
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;
