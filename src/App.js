
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


function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Nav></Nav>
        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </NoteState>
    
      
     
      
    </>
    
  );
}

export default App;
