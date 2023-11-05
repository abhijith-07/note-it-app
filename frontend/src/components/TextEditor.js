import { useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../assets/css/TextEditor.css'
import { CustomToolbar } from "./CustomToolbar";
import getCookie from "./GetCSRF";
import NotesApi from "../api/NotesApi";

const csrftoken = getCookie('csrftoken')

export const TextEditor = (props) => {
    const [noteHTML, setNoteHTML] = useState(props.content.content)
    
    const handleOnChange = (html) => {
        setNoteHTML(html)
    }

    const updateDB = async () => {
        console.log('Updated in db with data: ', noteHTML)
        try{
            const response = await NotesApi.put(props.url,
                {
                    title: props.content.title,
                    description: props.content.description,
                    content: noteHTML,
                    folder: props.content.folder
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                }
            )
            console.log(response.data)
        } catch (error){
            if (error.response){
                console.log("Response Error: ", error.response.data)
            }
            else{
                console.log("Request Error: ",error.request.data)
            }
        }
    }

    const modules = {
        toolbar: {
            container: '#toolbar',
        }
    }

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'background',
        'align',
        'save'
    ]


    return (
    <div className='text-editor'>
        <CustomToolbar updateDB={updateDB}/>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme={'snow'}
          value={noteHTML}
          onChange={handleOnChange}
          placeholder="Add notes here..."
        />
    </div>
    )
}

