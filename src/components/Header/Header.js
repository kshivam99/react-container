import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { useTabs } from "../../reducer/tabsReducer";


function Header() {
    const { state, dispatch } = useTabs();

    return (
        <div style={{display:"flex", alignItems:"center", marginTop:"1rem"}}> 
            <h1 style={{textAlign:"left", userSelect:"none", paddingLeft:"2rem"}}>Demo Container</h1>
            <AiOutlinePlus
            size={32}
          onClick={() => {
            state.tabs.length < 10 && dispatch({ type: "ADD_NEW_TAB" });
          }}
          style={{position:"absolute", cursor:"pointer", right:"1rem"}}
        />
        </div>
    )
}

export default Header
