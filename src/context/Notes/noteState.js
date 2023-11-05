import { useState } from "react";
import NoteContext from "./noteContext";
// import { json } from "react-router-dom";

const NoteState=(props)=>{
    const host='http://localhost:5000'
    const note=[]

    const [notes,setNotes]=useState(note)
      //to fetch all notes
      const getAllNotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchnotes/`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('auth-token')
            },
        })

        const json=await response.json()
        console.log(json)
        
        setNotes(json)

    }

    


    //to ADD a note
    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnotes/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('auth-token')
            },
            body:JSON.stringify({title,description,tag})
        })

        console.log('adding a new note')
        let note=await response.json()
        console.log(note)
        setNotes(notes.concat(note))
        

    }
    //to DELETE a note
    const delNote=async(id)=>{

        //API call
        const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('auth-token')
            },
            
        })
        const json=await response.json()
        console.log(json)
        console.log("deleted by using id"+id)
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

     //to UPDATE a note
    const editNote=async(id,title,description,tag)=>{
        //API call
        const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('auth-token')
            },
            body:JSON.stringify({title,description,tag})

        })

        let json=await response.json()
        // console.log(json)
        //logic to edit 
        // console.log(notes)
       
        let newNotes = JSON.parse(JSON.stringify(notes))
        // console.log(newNotes)
        for (let index = 0; index <newNotes.length; index++) {
            const element =newNotes[index];
            if(element._id===id){
               newNotes[index]=title;
               newNotes[index]=description;
               newNotes[index]=tag;
               break;

            }
           
        }
        getAllNotes();
    } 
   

    
    return (
        <NoteContext.Provider value={{notes,setNotes,delNote,addNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState