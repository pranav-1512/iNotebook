import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [notes])

    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        console.log('Updating note...', note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref1.current.click()
        props.showAlert("Updated Successfully", "success")
    }
    const ref = useRef(null)
    const ref1 = useRef(null)
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <div className="container">
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref1} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-2">
                        {notes.length === 0 && 'No Notes to display'}
                    </div>
                    {Array.isArray(notes)
                        ? notes.map((notes) => {
                            return <Noteitem key={notes._id} showAlert={props.showAlert} updateNote={updateNote} notes={notes} />
                        }) : null}
                    
                </div>
            </div>
        </>
    )
}
