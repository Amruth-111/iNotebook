
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





function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Nav></Nav>
        <Alert message="hello this is an alert"></Alert>
        <div className="container">
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </Router>

    </NoteState>
    
      
     
      
    </>
    
  );
}

export default App;
