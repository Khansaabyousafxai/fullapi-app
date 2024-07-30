import "./App.css";
import {Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";

function App() {
  return (
    <>
    <NoteState>
      <Navbar />
      <Alert message = "this is alert"/>
      <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;
