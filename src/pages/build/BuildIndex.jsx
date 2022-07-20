import { useReducer, useState } from "react";
import {
  buildInit,
  buildReducer,
  initialState,
  BuildContext,
} from "modules/build";

import BuilderOverview from "./BuilderOverview";
import CasePage from "./CasePage";
import CaseCoolingPage from "./CaseCoolingPage";
import CPUCoolerPage from "./CPUCoolerPage";
import CPUPage from "./CPUPage";
import GPUPage from "./GPUPage";
import MotherboardPage from "./MotherboardPage";
import PSUPage from "./PSUPage";
import RAMPage from "./RAMPage";
import StoragePage from "./StoragePage";
import SelectItemDefault from "./SelectItemDefault";

function BuildIndex() {
  const [page, setPage] = useState("overview");
  const [build, buildDispatch] = useReducer(
    buildReducer,
    initialState,
    buildInit
  );

  function Page() {
    switch (page) {
      default:
        return <SelectItemDefault  />;
      case "overview":
        return <BuilderOverview />;
    }
  }

  return (
    <BuildContext.Provider value={{ page, setPage, build, buildDispatch }}>
      <Page />
    </BuildContext.Provider>
  );
}

export default BuildIndex;
