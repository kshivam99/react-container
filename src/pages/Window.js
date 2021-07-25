import React from "react";
import TabsHeader from "../components/TabsHeader/TabsHeader";
import Header from "../components/Header/Header";
import { useTabs } from "../reducer/tabsReducer";

function Window() {
  const { state, dispatch } = useTabs();
  return (
    <div>
      <div>
        <Header />
        <TabsHeader />
        <button
          onClick={() => {
            state.tabs.length < 10 && dispatch({ type: "ADD_NEW_TAB" });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Window;
