import React, { useContext, useEffect, useRef, useState } from "react";
import Notecontext from "../context/notes/Notecontext";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  
  const context = useContext(Notecontext);
 const { notes, getallnotes, Editnote } = context;
 let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getallnotes()
    }
    else{
      navigate("/login")
    }
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (notes) => {
    ref.current.click();
    setNote({
      id: notes._id,
      etitle: notes.title,
      edescription: notes.description,
      etag: notes.tag,
    });
    
  };
  


  const handleclick = (e) => {
    Editnote(note.id, note.etitle, note.edescription)
    console.log("updated",note)
    refclose.current.click();
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <div className="container">
        <div>
          {/* Button trigger modal */}
          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="model-body">
                  <form className="container">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="etitle"
                        aria-describedby="emailhelp"
                        value={note.etitle}
                        onChange={onchange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="edescription"
                        value={note.edescription}
                        onChange={onchange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Description" className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="etag"
                        value={note.etag}
                        onChange={onchange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refclose}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleclick}>
                    UPdate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-1">
        <h4>{notes.length===0 && 'no notes to display'}</h4>
        </div>
        {notes.map((notes) => {
          return (
            <Notesitem key={notes._id} updateNote={updateNote} notes={notes} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
