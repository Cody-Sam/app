import { useReducer, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  buildInit,
  buildReducer,
  initialState,
  BuildContext,
} from "modules/build";

import BuilderOverview from "./BuilderOverview";
import SelectItemDefault from "./SelectItemDefault";

function BuildIndex() {
  const location = useLocation();
  const [page, setPage] = useState((location.state && location.state.page) || "overview");
  const [build, buildDispatch] = useReducer(
    buildReducer,
    initialState,
    buildInit
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/api/v1/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  function Page() {
    switch (page) {
      default:
        return <SelectItemDefault products={products} />;
      case "overview":
        return <BuilderOverview products={products} />;
    }
  }

  return (
    <BuildContext.Provider value={{ page, setPage, build, buildDispatch }}>
      <Page />
    </BuildContext.Provider>
  );
}

export default BuildIndex;
