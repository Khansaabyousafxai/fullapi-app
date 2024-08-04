import React ,{useState , useContext}from "react";
import Notecontext from "../context/notes/Notecontext";

const AddNote = () => {
    const context = useContext(Notecontext);
    const {Addnote} = context;

    const [note, setNote] = useState({title: "", description: "" ,tag:""})
    const handleclick =(e) =>{
        e.preventDefault();
     Addnote(note.title, note.description ,note.tag);
     setNote({title: "", description: "" ,tag:""})
    }

    const onchange =(e) =>{
       setNote({...note , [e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
                   Title
              </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailhelp"
              value={note.title}
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
              name="description"
              value={note.description}
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
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary " onClick={handleclick}>
            Submit
          </button>
        </form>
      </div>
  )
}

export default AddNote
