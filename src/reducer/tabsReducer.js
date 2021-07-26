import { createContext, useContext, useReducer } from "react";


export const tabsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_TAB":
      return {
        ...state,
        tabs: state.tabs.concat({id:JSON.stringify(state.total), content:`Tab ${state.total+1} Contents`}),
        total: state.total+1
      };
    case "CLOSE_TAB": 
      return {
          ...state,
          tabs: state.tabs.filter(item=>item.id!==action.payload)
      }
    case "UPDATE":
        return {
            ...state,
            tabs: action.payload
        }
    case "UPDATE_ACTIVE_TAB":
        return {
            ...state,
            activeTab: action.payload
        }
    default:
      break;
  }
  return state;
};

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tabsReducer, 
        {   
            activeTab:"0",
            total:3,
            tabs: [
                {
                    id:"0",
                    content:"Tab 1 Contents"
                },
                {
                    id:"1",
                    content:"Tab 2 Contents"
                },
                {
                    id:"2",
                    content:"Tab 3 Contents"
                }
            ],
        });
    return (
      <TabsContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        {children}
      </TabsContext.Provider>
    );
  };
  
  export const useTabs = () => useContext(TabsContext);