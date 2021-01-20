import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  error: errorReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
