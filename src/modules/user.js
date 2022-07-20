import { createContext } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "setStatus":
      return {...state, status: action.data.status}
    case "login":
      sessionStorage.setItem("token", action.data.token);
      return { ...state, status: "authenticated", user: action.data.user, token: action.data.token };
    case "logout":
      sessionStorage.removeItem("token");
      return { ...state, status: "unauthenticated", user: null, token: null };
    case "refresh":
      // refresh user session
      return { state };
    default:
      return state;
  }
}

const fetchUser = async (store,dispatch) => {
  let token = store.token;
  if (token) {
    dispatch({ type: "setStatus", data: { status: "pending" } });
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/me`, {
      headers: { authorization: "Bearer " + token },
    });
    const user = await res.json();
    dispatch({ type: "login", data: { user, token } });
  }
};

const UserContext = createContext();

export { userReducer, UserContext, fetchUser };
