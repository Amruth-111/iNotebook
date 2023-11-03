
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
        </Routes>
        </div>
      </Router>

    </NoteState>
    
      
     
      
    </>
    
  );
}

export default App;
