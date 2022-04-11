import { getByTitle } from "@testing-library/react";
import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const { note } = props;
  //notes take from NOtesstate context
  const  context = useContext(noteContext)
  const {deleteNote} = context;

  return (
    
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">
            {" "}
            {note.title} <strong>{note.tag}</strong>{" "}
          </h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash-can mx-2 text-danger" onClick={()=>{deleteNote(note._id)}}></i>
          
          <i className="fa-solid fa-pen-to-square mx-2 text-success"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
