import { FileAddedIcon } from "@primer/octicons-react";
import { useState } from "react";
import '../assets/css/AddNote.css';
import { useParams } from "react-router-dom";
import getCookie from "./GetCSRF";
import NotesApi from "../api/NotesApi";


export const AddNote = (props) => {
    const [showAddFileForm, setShowAddFileForm] = useState(false)
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const {folder_id} = useParams()

    const fileFormVisibility = () => {
      setShowAddFileForm(!showAddFileForm)
    }

    const getNoteTitle = (e) => {
        setNoteTitle(e.target.value)
    }

    const getNoteDescription = (e) => {
        setNoteDescription(e.target.value)
    }

    const csrftoken = getCookie('csrftoken');

    const addNote = async (e) => {
        e.preventDefault()

        try{
            const response = await NotesApi.post(`notes/fid/${folder_id}/`, 
                {
                    title: noteTitle,
                    description: noteDescription,
                    folder: folder_id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                }
            )
            console.log(response.data)
            setNoteTitle('')
            setNoteDescription('')
            props.setNoteDetails((oldData)=>[...oldData, response.data])
        } catch (error){
            console.log(error)
        }
    }

    return(
        <div className="add-note">
          <button className="add-button" onClick={fileFormVisibility} style={{color:showAddFileForm&&"red"}}>
            <FileAddedIcon size={36} />
          </button>
        {showAddFileForm&&(
            <div className="create-note-form">
            <form className="row justify-content-center" onSubmit={addNote}>
                <input type="text" placeholder="Note title.." className="col form-control" onChange={getNoteTitle} value={noteTitle} />
                <input type="text" placeholder="Note description.." className="col form-control" onChange={getNoteDescription} value={noteDescription} />
                <button className="btn btn-success" type="submit">Create Note</button>
            </form>
            </div>
        )}
        </div>
    )
}