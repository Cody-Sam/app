import { createContext } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "login":
      sessionStorage.setItem("token", action.data.token);
      return { user: action.data.user, token: action.data.token };
    case "logout":
      sessionStorage.removeItem("token");
      return { ...state, user: null, token: null };
    case "refresh":
      // refresh user session
      return { state };
    default:
      return state;
  }
}

const UserContext = createContext();

export { userReducer, UserContext };
