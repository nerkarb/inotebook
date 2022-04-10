import React,{ useContext } from 'react'

import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
function Notes() {
     //notes take from NOtesstate context
  const  context = useContext(noteContext)
  const {notes,setNotes} = context;
  return (
 
      <div className="row my-3">
      <h2><i  style={{color:"green"}}><u>Your note</u></i></h2>
      {notes.map((note)=>{
        return <NoteItem note={note}/>
      })}
      </div>

  )
}

export default Notes
