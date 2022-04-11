import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitials = [ ];

  const [notes, setNotes] = useState(notesInitials);
  //Get all Notes
  const getNotes = async () => {
         //TODO : API call
    //FETCH DATA FROM NODE USING api
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MWEzYzEwMTk2YWNkZDQ3MWRkZWI2In0sImlhdCI6MTY0OTUyMjkzOX0.e5H47vEneY-4F363ihDjUMhiQ0EkYlHgAcHIXGCdNnc",
        },
        
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
      //const json = response.json();
      //
  }
  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    //FETCH DATA FROM NODE USING api
    //console.log(note.title)
    //console.log(note.description)
    console.log("insisde add note")
    const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MWEzYzEwMTk2YWNkZDQ3MWRkZWI2In0sImlhdCI6MTY0OTUyMjkzOX0.e5H47vEneY-4F363ihDjUMhiQ0EkYlHgAcHIXGCdNnc"
        },
        body: JSON.stringify({title,description,tag})
      });
      //const json = response.json()
      const note = {
 
        "user": "6131dc5e3e4037cd4734a0664",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      };
      
      setNotes(notes.concat(note))
      
  }
  //Update Note
  const updateNote = async (id, title, description, tag) => {
    //FETCH DATA FROM NODE USING api
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MWEzYzEwMTk2YWNkZDQ3MWRkZWI2In0sImlhdCI6MTY0OTUyMjkzOX0.e5H47vEneY-4F363ihDjUMhiQ0EkYlHgAcHIXGCdNnc",
      },
      body: JSON.stringify(title,description,tag),
    });
    const json = response.json();
    //
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  //Delete note
  const deleteNote = async (id) => {
    //FETCH DATA FROM NODE USING api
    console.log(id)
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MWEzYzEwMTk2YWNkZDQ3MWRkZWI2In0sImlhdCI6MTY0OTUyMjkzOX0.e5H47vEneY-4F363ihDjUMhiQ0EkYlHgAcHIXGCdNnc",
      },
     
    });
    const json =  response.json();
    console.log(json)
    //setNotes(json)
    //
    console.log("Dlete id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, updateNote, deleteNote , getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
