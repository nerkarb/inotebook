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
        },
        {
            "_id": "6251d80cdad435b9c72e8862",
            "user": "6251a3c10196acdd471ddeb6",
            "title": "My title",
            "description": "New notes",
            "tag": "personal",
            "date": "2022-04-09T19:01:32.073Z",
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
      
      //Add Note
      const addNote = (title,description,tag) =>{
            //TODO : API call
            const note =  {
                "_id": "6251d80cdad435b9c72e8862",
                "user": "6251a3c10196acddd471ddeb6",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2022-04-09T19:01:32.073Z",
                "__v": 0
              }
            setNotes(notes.concat(note))
      }
      //Update Note
      const updateNote = (id, title,description,tag) =>{
          
        }

      //Delete note
      const deleteNote = (id) =>{
          console.log("Dlete id"+id)
          const newNotes = notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)
    }

    return(
      
        <NoteContext.Provider value={{notes,setNotes, addNote,updateNote,deleteNote}}>
            {props.children}

        </NoteContext.Provider>
     
    )
}

export default  NoteState;

