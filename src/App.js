import "./App.css";
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="Inotebook "/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
