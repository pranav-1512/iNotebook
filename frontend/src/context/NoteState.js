import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = 'http://localhost:5000'
    // const initialNote = []
    const [notes, setNotes] = useState([])

    // Add a Note
    const getNotes = async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          const json = await response.json(); 
        //   console.log(json)
          setNotes(json)
    }

    const addNote = async(title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });
          const json = await response.json(); 
          console.log(json)
          const note = json.data
        // const note = {
        //     "_id": "65a6891f0ab53a20255d1c37",
        //     "user": "659fe5f7fdf502387fb25bf9",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2024-01-16T13:48:15.308Z",
        //     "__v": 0
        // }
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify(), 
          });
          const json = await response.json();
          console.log(json)
    }

    // Edit a Note
    const editNote = async(id, title, description, tag)=>{
        // API
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });
          const json = response.json(); 
          console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id===id) {
                newNotes[index].title = title                
                newNotes[index].description = description                
                newNotes[index].tag = tag
                break                
            }            
        }
        setNotes(newNotes)
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState