import "./App.css";
import {Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <>
    <NoteState>
      <Navbar />
      {/* <Alert message = "this is alert"/> */}
      <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;
