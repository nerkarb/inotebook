import React, { useState } from "react";

import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const notesInitials = [
        {
          "_id": "6251c94086ae5a873a1a6a55",
          "user": "6251a3c10196acdd471ddeb6",
          "title": "My title",
          "description": "New notes",
          "tag": "personal",
          "date": "2022-04-09T17:58:24.148Z",
          "__v": 0
        },
        {
          "_id": "6251d80cdad435b9c72e8862",
          "user": "6251a3c10196acdd471ddeb6",
          "title": "My title",
          "description": "New notes",
          "tag": "personal",
          "date": "2022-04-09T19:01:32.073Z",
          "__v": 0
        }
      ]

      const[notes,setNotes] = useState(notesInitials)
    
    return(
      
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}

        </NoteContext.Provider>
     
    )
}

export default  NoteState;

