import React, { useContext, useEffect } from "react";
import Notecontext from "../context/notes/Notecontext";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
const Notes = () => {
    const context = useContext(Notecontext);
    const {notes, getallnotes} = context;
    useEffect(() => {
        getallnotes()
    }, [])
    
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((notes)=>{
       return <Notesitem key={notes._id} notes={notes}/>;
      })}
      </div>
      </>
  )
}

export default Notes
