import { useContext } from "react";
import TopBarContext from "modules/topBar.js";

function TopBar({ sidebarOpen }) {
  const { topBarSearchValue, setTopBarSearchValue } = useContext(TopBarContext);
  let topBarContent = { title: "PC Builder 9001", searchBar: false };
  return (
    <div className="w-full flex-1 h-[49px] border-b bg-slate-500 z-50 flex">
      {topBarContent.title && <p className="my-auto px-2">{topBarContent.title}</p>}
      {!sidebarOpen && topBarContent.searchBar && (
        <input className="w-full px-2" placeholder="Search Terms" value={topBarSearchValue} onChange={(event)=>setTopBarSearchValue(event.target.value)}></input>
      )}
    </div>
  );
}
export default TopBar;
