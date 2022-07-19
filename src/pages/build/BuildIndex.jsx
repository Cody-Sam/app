import { useState } from "react";

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

function BuildIndex() {
  const [page, setPage] = useState("overview");
  const [build, setBuild] = useState({ case: null });
  switch (page) {
    case "overview":
      return (
        <BuilderOverview
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "case-cooling":
      return (
        <CaseCoolingPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "case":
      return (
        <CasePage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "cpu-cooler":
      return (
        <CPUCoolerPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "cpu":
      return (
        <CPUPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "gpu":
      return (
        <GPUPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );

    case "motherboard":
      return (
        <MotherboardPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "psu":
      return (
        <PSUPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "ram":
      return (
        <RAMPage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
    case "storage":
      return (
        <StoragePage
          page={page}
          setPage={setPage}
          build={build}
          setBuild={setBuild}
        />
      );
  }
}

export default BuildIndex;
