import React from "react";
import { useTabs } from "../../reducer/tabsReducer";
import styles from "../TabsHeader/TabsHeader.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

function Modal({ id, setViewModal, setTabIndex }) {
  const { state,dispatch } = useTabs();

  function submitHandler(e) {
    e.preventDefault();

    if (e.target.name === "btn" && state.tabs.length>1) {
      dispatch({ type: "CLOSE_TAB", payload: id });
      dispatch({type:"UPDATE_ACTIVE_TAB",payload:state.tabs[0].id===id?state.tabs[1].id:state.tabs[0].id})
      setTabIndex(state.tabs[0].id===id?state.tabs[1].id:state.tabs[0].id)
    }
    else if(state.tabs.length===1){
        setViewModal(false)
    }
  }

  return (
    <div
      className={styles.modalContainer}
      onClick={(e) => {
        submitHandler(e);
      }}
    >
      <form className={styles.editModal} onSubmit={(e) => submitHandler(e)}>
        <div className={styles.modalText}>
          {state.tabs.length>1?`Do you want to close Tab ${Number(id) + 1}?`:`Atleast 1 Tab should be open`}
          <AiOutlineCloseCircle onClick={() => setViewModal(false)} />
        </div>
        <button name="btn" type="submit">
        {state.tabs.length>1?`Yes`:`Close`}
        </button>
      </form>
    </div>
  );
}

function Tab({ item, id, tabIndex, setTabIndex }) {
  const ref = React.useRef();
  const { dispatch } = useTabs();
  const [viewModal, setViewModal] = React.useState(false);

  React.useEffect(() => {
    if (tabIndex === id) {
      ref.current.scrollIntoView();
    }
  }, [tabIndex, id]);

  return (
    <div
      className={styles.tab}
      style={{ borderBottom: tabIndex===item.id && "4px solid #2563EB" }}
      onMouseDown={() => {
          setTabIndex(item.id);
          dispatch({type:"UPDATE_ACTIVE_TAB",payload:item.id})
        }}
    >
      <h1 ref={ref}>Tab {Number(item.id) + 1}</h1>
      <GrFormClose
        size={24}
        className={styles.close}
        onClick={() => setViewModal((prev) => !prev)}
      />
      {viewModal && <Modal id={item.id} setViewModal={setViewModal} setTabIndex={setTabIndex}/>}
    </div>
  );
}

export default Tab;
