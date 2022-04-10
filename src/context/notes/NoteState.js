import React, { useState } from "react";

import NoteContext from "./noteContext";


const NoteState = (props) =>{

    
    const s1 ={
        "name":"bhushan",
        "class":"5B"
    }
   
    
    return(
      
        <NoteContext.Provider value={{}}>
            {props.children}

        </NoteContext.Provider>
     
    )
}

export default  NoteState;

