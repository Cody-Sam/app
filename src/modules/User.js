import {createContext } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "login":
      // login data to session or local storage
      return { ...state, user: action.data.user, token: action.data.token };
    case "logout":
      // remove data from session or local storage
      return { ...state, user: null, token: null };
    case "refresh":
      // refresh user session
      return { state };
    default:
      return state;
  }
}

const UserContext = createContext();

export {userReducer, UserContext}
