import { TextEditor } from "../components/TextEditor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Note.css"
import NotesApi from "../api/NotesApi";

export const Note = () => {
    const {folder_id} = useParams()
    const {notes_id} = useParams()

    const url = `notes/fid/${folder_id}/nid/${notes_id}/`

    const [content, setContent] = useState(null)

    const getContent = async () => {
        try{
            const response = await NotesApi.get(url)
                setContent(response.data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getContent()
    }, [])

    return (
        <>
            {content !== null?(
                <TextEditor content={content} url={url} />
            ):
            (<p>Loading...</p>)
            }
        </>
    )
}
