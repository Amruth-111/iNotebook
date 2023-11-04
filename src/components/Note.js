import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../context/Notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Note = () => {
  let context = useContext(noteContext);
  const { notes, getAllNotes,editNote } = context;
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, []);
  const[note,setNote]=useState({id:"",etitle:"", edescription:"",etag:""})

  const handleClick=(e)=>{
    console.log("updatging the note",note)
    // e.preventDefault()
    console.log(note.id,note.etitle,note.edescription,note.etag)
    editNote(note.id, note.etitle, note.edescription, note.etag)
  }

  const onChange=(e)=>{
      e.preventDefault()
  setNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    console.log("ckjhjs");
  };
  return (
    <>
      <Addnote />

      <button   type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form className="my-3">
          <div className="form-group">
            <label htmlFor="etitle">Title</label>
            <input
              onChange={onChange}
              type="text"
              value={note.etitle}
              className="form-control my-2"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              placeholder="enter title"
            />
          
          </div>
          <div className="form-group">
            <label htmlFor="edescription">description</label>
            <input
              type="text"
              value={note.edescription}
              className="form-control my-2"
              id="edescription"
              name="edescription"
              placeholder="Enter Description"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="etag">tag</label>
            <input
            value={note.etag}
              type="text"
              className="form-control my-2"
              id="etag"
              name="etag"
              placeholder="Enter tag"
              onChange={onChange}
            />
          </div>
         
     
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" data-bs-dismiss='modal' onClick={handleClick}className="btn btn-primary">
                update notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Read Note</h2>

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} /> 
        })}
      </div>
    </>
  );
};

export default Note;
