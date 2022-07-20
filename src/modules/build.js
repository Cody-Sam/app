import { createContext } from "react";
import { parts } from "./parts";

let initialState = {};
parts.map((part) => (initialState[part.slug] = null));

const buildInit = (initialValue = initialState) => {
  let state = JSON.parse(localStorage.getItem("build")) || initialValue;
  localStorage.setItem("build", JSON.stringify(state));
  return state;
};

function buildReducer(state, action) {
  switch (action.type) {
    case "getBuild":
      state = JSON.parse(localStorage.getItem("build"));
      return state;
    case "setItem":
      state[action.data.type] = action.data.value;
      localStorage.setItem("build", JSON.stringify(state));
      return state;

    case "resetBuild":
      return initialState;
    default:
      return state;
  }
}

const BuildContext = createContext();

export { buildInit, buildReducer, initialState, BuildContext };
