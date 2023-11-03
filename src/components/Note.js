import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import NoteItem from "./NoteItem"
import Addnote from "./Addnote";

const Note = () => {
    let context = useContext(noteContext);
    const { notes} = context;
  return (
    <>
    <Addnote></Addnote>
    <div className="row">
      <h2>Read Note</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id}note={note}></NoteItem>
      })}
    </div>
    </>
  );
};

export default Note;
