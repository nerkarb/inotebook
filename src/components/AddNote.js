import React,{ useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
function AddNote() {
      //notes take from NOtesstate context
  const  context = useContext(noteContext)
  const {addNote} = context;

  //usestate
  const [note,setNote] = useState({"title":"","description":"","tag":""})
  
  const handleAddNote=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag);
    setNote({"title":"","description":"","tag":""})
    
  }
  //onchage handle
  const onChange = (e) =>{
      //spered syntax
        setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
      <h2><i style={{color:"purple"}}><u>Add a note</u></i></h2>
      {/* Note form */}
        <form>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}
            value={note.title} />
            
            </div>
            <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}  value={note.description} />
            </div>
            <div className="mb-3 ">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}  value={note.tag} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleAddNote}>ADD NOTE</button>
        </form>
        </div>
        </div>
  )
}

export default AddNote
