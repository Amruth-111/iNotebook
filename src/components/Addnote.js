import React ,{useContext, useState} from 'react'
import noteContext from '../context/Notes/noteContext';



const Addnote = () => {
let context = useContext(noteContext);
const {addNote} = context;
const[note,setNote]=useState({title:" ", description:" ",tag:"default "})
const handleClick=(e)=>{
    e.preventDefault()
addNote(note.title,note.description,note.tag)
}
const onChange=(e)=>{
    e.preventDefault()
setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>
      <div>
      <div className="container my-5">
        <h2>Add your note</h2>
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title ">Title</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="enter title"
            />
          
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control my-2"
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={onChange}
            />
          </div>
         
          <button type="submit" onClick={handleClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
        
      </div>
      
    </div>
    </div>
  )
}

export default Addnote
