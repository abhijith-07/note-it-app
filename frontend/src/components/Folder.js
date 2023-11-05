import { TrashIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import getCookie from "./GetCSRF";
import NotesApi from "../api/NotesApi";


export const Folder = (props) => {
    
    const csrftoken = getCookie('csrftoken')
    const deleteFolder = async (folder_id) => {
      try{
            const response = await NotesApi.delete(
            `notes/fid/${folder_id}/`,
            {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
                } 
            }
            )
            console.log('Deleted')
            const updateDetails = props.folderDetails.filter((folder) => folder.id !== folder_id)
            props.setFolderDetails(updateDetails)
        } catch (error) {
            console.log(error)
        }
    }

    const link = `${props.id}/notes/`
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 folder">
            <Link to={link} style={{ textDecoration: 'none' }}>
                <div className="folder-info-box">
                    <h3 className="title">{props.title}</h3>
                    <hr />
                    <p className="description">{props.description}</p>
                </div>
            </Link>
            <div className="delete-folder">
                <button className="btn btn-danger" onClick={() => deleteFolder(props.id)}>
                    <TrashIcon size={24} />
                </button>
            </div>
        </div>
    );
}
