import React,{useContext} from "react";
import noteContext from "../context/Notes/noteContext";


const NoteItem = (props) => {
  const {note,updateNote} = props;
  let context = useContext(noteContext);
  const { delNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} soluta tempora aliquam est atqueo earum, facere voluptatibus.
          </p>
          <p>{note.tag}</p>
          <p>{note.date}</p>
          <i className="fa-solid fa-trash-can " onClick={()=>{delNote(note._id);props.showAlert("deleted successfully","success")}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
