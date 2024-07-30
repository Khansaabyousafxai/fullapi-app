import { useState } from "react";
import Notecontext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost5000";
  const notesinitial = [];

  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
      },
      
    });
      const json= await response.json()
      console.log(json)
  
  };


  
 
  const Addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "66a293a4a4f89cb024999fba22",
      user: "66976fe448ba3bf5dd10492d",
      title: title,
      description: description,
      tag: tag,
      date: "2024-07-25T18:04:20.047Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  const Deletenote = (id) => {
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnote);
  };

  const Editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) element.title = title;
      element.description = description;
      element.tag = tag;
    }
  };

  const [notes, setNotes] = useState(notesinitial);

  return (
    <Notecontext.Provider value={{ notes, Addnote, Deletenote, Editnote ,getallnotes}}>
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
