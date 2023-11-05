import { useEffect, useState } from "react";
import "../assets/css/FoldersLists.css";
import Axios from 'axios';
import { DiffAddedIcon } from "@primer/octicons-react";
import { AddFolder } from "../components/AddFolder";
import { Folder } from "../components/Folder";
import NotesApi from "../api/NotesApi";

export const FoldersLists = () => {

  const [addfolderButton, setAddFolderButton] = useState(false)
  const [folderDetails, setFolderDetails] = useState([]);
  
  const fileFormVisibility = () => {
    setAddFolderButton(!addfolderButton)
  }

  const fetchFolderDetails = async () => {
    try{
      const response = await NotesApi.get("folders/")
      setFolderDetails(response.data)
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=> {
    fetchFolderDetails()
  }, [])

  return (
    <div>
      <div className="add-folder">
        <button onClick={fileFormVisibility} style={{color:addfolderButton&&"red"}}>
          <DiffAddedIcon size={40} />
        </button>
      </div>
      
      {addfolderButton&&(
        <div className="create-note-form">
          <AddFolder buttonVisibility={setAddFolderButton} setFolderDetails={setFolderDetails}/>
        </div>
      )}

      <div className="row justify-content-center folder-group">
        {folderDetails.map((folder, index) => (
          <Folder
            key={index}
            id = {folder.id}
            title={folder.name}
            description={folder.description}
            folderDetails = {folderDetails}
            setFolderDetails={setFolderDetails}
          />
        ))}
      </div>
    </div>
  );
};

