import React from "react";
import TabsHeader from "../components/TabsHeader/TabsHeader";
import Header from "../components/Header/Header";
import { useTabs } from "../reducer/tabsReducer";

function Window() {
    const {state} = useTabs();
  return (
    <div>
      <Header />
      <TabsHeader />
      <div>
          <h1 style={{marginTop:"4rem", userSelect:"none"}}>{state.tabs.find(item=>item.id===state.activeTab).content}</h1>
      </div>
    </div>
  );
}

export default Window;
