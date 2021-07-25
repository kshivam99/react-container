import React from "react";
import { useTabs } from "../../reducer/tabsReducer";
import styles from "./TabsHeader.module.css";

function Tab({ item, active, setTabIndex, index }) {
  const ref = React.useRef();
  const { dispatch } = useTabs();

  React.useEffect(() => {
    if (active) {
      ref.current.scrollIntoView();
    }
  });

  return (
    <div className={styles.tab} ref={ref} style={{borderBottom: active && "4px solid #2563EB"}} onClick={()=>setTabIndex(index)}>
      <h1>Tab {item.id + 1}</h1>
      <span className={styles.close} onClick={()=>dispatch({type:"CLOSE_TAB", payload:item.id})}>X</span>
    </div>
  );
}

function TabsHeader() {
  const { state } = useTabs();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [showChevron, setShowChevron] = React.useState(false);

  return (
    <div className={styles.container}>
      { tabIndex !== 0 &&  showChevron && <button
        onClick={() => setTabIndex((prev) => (prev === 0 ? prev : prev - 1))}
      >
        &lt;
      </button>}
      <div className={styles.tabs}>
        {state.tabs.map((item, index) => (
          <Tab key={item.id} item={item} active={tabIndex === index} setTabIndex={setTabIndex} index={index}/>
        ))}
      </div>
      { tabIndex !== state.tabs.length-1 && showChevron && <button
        onClick={() =>
          setTabIndex((prev) =>
          prev===state.tabs.length-1? prev : prev + 1
          )
        }
      >
        &gt;
      </button>}
    </div>
  );
}

export default TabsHeader;
