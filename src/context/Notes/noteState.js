import { useState } from "react";
import NoteContext from "./noteContext";

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
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NGVkY2FmMzhjMjNmNmM1MzRkYmQ2In0sImlhdCI6MTY5OTAxNjIxOX0.sIWSt7v5AIyJvKl8Ni1uaAhdSwo9JGD5kQU2-jclDqM"
            },
        })

        const json=await response.json()
        console.log(json)
        
        setNotes(json)

    }

    


    //to ADD a note
    const addNote=async(title, description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnotes/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NGVkY2FmMzhjMjNmNmM1MzRkYmQ2In0sImlhdCI6MTY5OTAxNjIxOX0.sIWSt7v5AIyJvKl8Ni1uaAhdSwo9JGD5kQU2-jclDqM"
            },
            body:JSON.stringify({title,description,tag})
        })

        console.log('adding a new note')
        let note={
            "_id": "6544ef12197a31a53800109",
            "user": "6544edcaf38c23f6c534dbd",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-11-03T13:01:06.547Z",
            "__v": 0
        }
        setNotes(notes.concat(note))

    }
    //to DELETE a note
    const delNote=async(id)=>{

        //API call
        const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NGVkY2FmMzhjMjNmNmM1MzRkYmQ2In0sImlhdCI6MTY5OTAxNjIxOX0.sIWSt7v5AIyJvKl8Ni1uaAhdSwo9JGD5kQU2-jclDqM"
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
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NGVkY2FmMzhjMjNmNmM1MzRkYmQ2In0sImlhdCI6MTY5OTAxNjIxOX0.sIWSt7v5AIyJvKl8Ni1uaAhdSwo9JGD5kQU2-jclDqM"
            },
            body:JSON.stringify({title,description,tag})
        })

        //logic to edit 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag

            }
            
        }

    } 
   

    
    return (
        <NoteContext.Provider value={{notes,setNotes,delNote,addNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState