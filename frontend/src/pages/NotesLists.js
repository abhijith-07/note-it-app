import { useEffect, useState } from "react";
import "../assets/css/NotesLists.css";
import { useParams } from "react-router-dom";
import { Notes } from "../components/Notes";
import { AddNote } from "../components/AddNote";
import { TrashIcon } from "@primer/octicons-react";
import getCookie from "../components/GetCSRF";
import NotesApi from "../api/NotesApi";


export const NotesLists = () => {
  const [noteDetails, setNoteDetails] = useState([]);
  const [todayDate, setTodayDate] = useState('')
  const {folder_id} = useParams()
  
  const getNoteDetails = async () => {
    try{
      const response = await NotesApi.get(`notes/fid/${folder_id}/`)
      setNoteDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const csrftoken = getCookie('csrftoken')

  const deleteNote = async (noteId) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      } 
    }
    try{
        const response = await NotesApi.delete(`notes/fid/${folder_id}/nid/${noteId}`, headers)
        const updatedNoteDetails = noteDetails.filter((notes)=>(notes.id !== noteId && notes))
        setNoteDetails(updatedNoteDetails)
      } catch (error) {
        console.log(error)
      }
  }

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()+1
    const day = today.getDate()
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const date = `${year}-${formattedMonth}-${formattedDay}`;
    setTodayDate(date)
  }

  useEffect(()=>{
    getNoteDetails()
    getTodayDate()
  },[])

  return (
    <div>
      <AddNote setNoteDetails={setNoteDetails} />
      <div className="row justify-content-center notes-group">
        {noteDetails.map((note, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 notes" key={index}>
            <Notes
              id={note.id}
              key={index}
              title={note.title}
              description={note.description}
              date={(note.updated_date===todayDate)?note.updated_time:note.updated_date}
              folderId={folder_id}
              noteDetails={noteDetails}
              setNoteDetails={setNoteDetails}
            />
            <div className="delete-note">
              <button className="btn btn-danger" onClick={()=>deleteNote(note.id)} >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


