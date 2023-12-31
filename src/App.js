
import './App.css';

import NoteState from './context/Notes/noteState';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';





function App() {
  const [alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <>
    <NoteState>
      <Router>
        <Nav></Nav>
        <Alert alert={alert}></Alert>
        <div className="container">
        <Routes>
            <Route exact path="/" element={<Login showAlert={showAlert} />} />
            <Route exact path="/about" element={<About  />} />
            <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
      </Router>

    </NoteState>
    
      
     
      
    </>
    
  );
}

export default App;
