import { createContext } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "setStatus":
      return {...state, status: action.data.status}
    case "login":
      sessionStorage.setItem("token", action.data.token);
      return { ...state, status: "authorised", user: action.data.user, token: action.data.token };
    case "logout":
      sessionStorage.removeItem("token");
      return { ...state, status: "noUser", user: null, token: null };
    case "refresh":
      // refresh user session
      return { state };
    default:
      return state;
  }
}

const UserContext = createContext();

export { userReducer, UserContext };
