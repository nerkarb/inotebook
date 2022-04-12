import React, { useContext, useEffect, useLayoutEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = (props) => {
    const {showAlert} = props
    //navoigation
    const navigate = useNavigate()
  //notes take from NOtesstate context
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  //referance to modal
  const ref = useRef(null);
  const refClose = useRef(null);
  //usestate
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  //display updated notes
  useEffect(() => {
      //check valid user
     
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token")){
        console.log(localStorage.getItem("token"))
        getNotes();
       
      }
      else{
        console.log(localStorage.getItem("token"))
          navigate('/login')
      }
    
  }, []);
  //update note
  const updateNote = (currentNote) => {
    ref.current.click();
    console.log(currentNote._id)
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };
  
  
  const handleUpdateNote=(e)=>{
    editNote(note.id, note.etitle, note.edescription,note.etag)
    refClose.current.click()
    
    props.showAlert("Update  Successfully","primary")
    
    
  }
  
  //onchage handle
  const onChange = (e) =>{
      //spered syntax
        setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Modal
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* Note form */}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                
              </form>
              {/* fORM END */}
            </div>
            <div class="modal-footer">
              <button  ref={refClose}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleUpdateNote} class="btn btn-primary">
                UPDATE NOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>
          <i style={{ color: "green" }}>
            <u>Your note</u>
          </i>
        </h2>
        
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={()=>{updateNote(note)}} showAlert={showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
