import { useState } from "react";
import getCookie from "./GetCSRF";
import NotesApi from "../api/NotesApi";

export const AddFolder = (props) => {
    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');

    const handleFolderName = (e) => {
        setFolderName(e.target.value);
    }

    const handleFolderDescription = (e) => {
        setFolderDescription(e.target.value);
    }

    const csrftoken = getCookie('csrftoken');

    const submitDetails = async (e) => {
        e.preventDefault();

        try {
            const response = await NotesApi.post(
                "folders/",
                {
                    name: folderName,
                    description: folderDescription
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                }
            )
            console.log('Folder created:', response.data);
            setFolderName('')
            setFolderDescription('')

            const newData = response.data
            props.setFolderDetails((oldData) => [...oldData, newData])

            props.buttonVisibility((prevVisibility) => (!prevVisibility))
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <form className="row justify-content-center" onSubmit={submitDetails}>
            <input type="text" placeholder="Folder Name.." className="col form-control" onChange={handleFolderName} value={folderName} />
            <input type="text" placeholder="Description about the folder.." className="col form-control" onChange={handleFolderDescription} value={folderDescription} />
            <button className="btn" type="submit">Create</button>
        </form>
    );
}
