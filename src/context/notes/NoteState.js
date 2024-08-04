import { useState } from "react";
import Notecontext from "./Notecontext";
import axios from "axios";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  const getallnotes = async () => {
    try {
      const response = await axios.get(`${host}/api/notes/fetchallnotes`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
        },
      });
      const data = await response.data;
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const Addnote = async (title, description, tag) => {
    try {
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
          },
        }
      );

      const note = await response.data;
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Error adding note:", error);
      // Handle the error as needed
    }
  };

  const Deletenote = async (id) => {
    try {
      const response = await axios.delete(
        `${host}/api/notes/deletenote/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
          },
        }
      );

      const newnote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newnote);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const Editnote = async (id, title, description, tag) => {
    try {
      // Replace `host` with your actual API base URL if not already defined.
      const response = await axios.put(
        `${host}/api/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzZmZTQ0OGJhM2JmNWRkMTA0OTJkIn0sImlhdCI6MTcyMTQwOTAzM30.cZ5QGV_z0m0XEZRK29nO1TiX6HAfo5snrQ4PDzcpZq0",
          },
        }
      );
      let newnotes = JSON.parse(JSON.stringify(notes));
      // If you need to update the local `notes` array with the updated data:
      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if (element._id === id) {
          newnotes[index].title = title;
          newnotes[index].description = description;
          newnotes[index].tag = tag;
          break;
        }
      }
      setNotes(newnotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  const [notes, setNotes] = useState(notesinitial);

  return (
    <Notecontext.Provider
      value={{ notes, Addnote, Deletenote, Editnote, getallnotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
