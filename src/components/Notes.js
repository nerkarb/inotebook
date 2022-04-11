import React,{ useContext } from 'react'

import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
function Notes() {
     //notes take from NOtesstate context
  const  context = useContext(noteContext)
  const {notes,setNotes} = context;
  return (
    <>
    <AddNote />
      <div className="row my-3">
      <h2><i  style={{color:"green"}}><u>Your note</u></i></h2>
      {notes.map((note)=>{
        return <NoteItem key={note._id} note={note}/>
      })}
      </div>
      </>

  ) 
}

export default Notes
