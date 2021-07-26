import React from "react";
import { useTabs } from "../../reducer/tabsReducer";
import styles from "./TabsHeader.module.css";
import Tab from "../Tab/Tab";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TabsHeader() {
  const { state, dispatch } = useTabs();
  const ref = React.useRef();
  const [tabIndex, setTabIndex] = React.useState(state.tabs[0].id);
  const [showChevron, setShowChevron] = React.useState(false);

  React.useEffect(() => {
    if (state.tabs.length * 200 > ref.current.clientWidth) {
      setShowChevron(true);
    } else {
      setShowChevron(false);
    }
  }, [state]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(state.tabs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "UPDATE", payload: items });
  }

  function nextTab(id) {
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].id === id && i !== state.tabs.length - 1) {
        return state.tabs[i + 1].id;
      }
    }
    return id;
  }

  function prevTab(id) {
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].id === id && i !== 0) {
        return state.tabs[i - 1].id;
      }
    }
    return id;
  }

  return (
    <div className={styles.container}>
      <FaChevronLeft
        style={{
          visibility:
            tabIndex !== state.tabs[0].id && showChevron ? "" : "hidden",
          margin: "0 1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          setTabIndex((prev) => prevTab(prev));
          dispatch({ type: "UPDATE_ACTIVE_TAB", payload: prevTab(tabIndex) });
        }}
      />
      <div
        className={styles.tabs}
        ref={ref}
        onWheel={(event) => {
            ref.current.scrollLeft -= (event.deltaY*2);
        }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tabs" direction="horizontal">
            {(provided) => (
              <div
                className={styles.innerTabs}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.tabs.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Tab
                            key={item.id}
                            id={item.id}
                            item={item}
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <FaChevronRight
        style={{
          visibility:
            tabIndex !== state.tabs[state.tabs.length - 1].id && showChevron
              ? ""
              : "hidden",
          margin: "0 1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          setTabIndex((prev) => nextTab(prev));
          dispatch({ type: "UPDATE_ACTIVE_TAB", payload: nextTab(tabIndex) });
        }}
      />
    </div>
  );
}

export default TabsHeader;
