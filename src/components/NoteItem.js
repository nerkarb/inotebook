import { getByTitle } from "@testing-library/react";
import React from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const { note } = props;
  return (
    
    <div className="col-md-3">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">
            {" "}
            {note.title} <strong>{note.tag}</strong>{" "}
          </h5>
          <p class="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
