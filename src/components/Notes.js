import React,{ useContext, useEffect, useLayoutEffect } from 'react'

import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = ()=> {
     //notes take from NOtesstate context
  const  context = useContext(noteContext)
  const {notes,getNotes} = context;
  //display updated notes
  useEffect(()=>{
      getNotes()
  },[])
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
