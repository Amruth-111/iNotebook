import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

    let textNote=
        [
            {
                "_id": "6544eed6197a31a538001096",
                "user": "6544edcaf38c23f6c534dbd6",
                "title": "hello world",
                "description": "this is description",
                "tag": "personal",
                "date": "2023-11-03T13:00:06.998Z",
                "__v": 0
            },
            {
                "_id": "6544eef1197a31a538001098",
                "user": "6544edcaf38c23f6c534dbd6",
                "title": "book that never read",
                "description": "no description",
                "tag": "secret",
                "date": "2023-11-03T13:00:33.105Z",
                "__v": 0
            },
            {
                "_id": "6544ef12197a31a53800109a",
                "user": "6544edcaf38c23f6c534dbd6",
                "title": "jungle run",
                "description": "this is a adventurous story of a guy name msurht",
                "tag": "adventure",
                "date": "2023-11-03T13:01:06.547Z",
                "__v": 0
            }
        ]
    

    const [notes,setNotes]=useState(textNote)

    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState