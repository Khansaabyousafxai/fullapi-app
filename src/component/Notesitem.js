import React, { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

const Notesitem = (props) => {
    const context = useContext(Notecontext);
    const {Deletenote} = context;
    const { notes, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{notes.title}</h5>
            <i class="fa-solid fa-trash mx-2" onClick={()=>{Deletenote(notes._id)}}></i>
            <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i>
          </div>

          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
