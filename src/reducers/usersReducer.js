const initState = [];
const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      let ids = new Set(state.map((e) => e.id));
      return state.concat(action.payload.filter((el) => !ids.has(el.id)));
    default:
      return state;
  }
};
export default usersReducer;
