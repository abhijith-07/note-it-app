import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { NotesLists } from './pages/NotesLists';
import { Note } from './pages/Note';
import { NavBar } from './components/NavBar';
import { FoldersLists } from './pages/FoldersLists';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<FoldersLists />}/>
            <Route path='/:folder_id/notes/' element={<NotesLists />}/>
            <Route path='/:folder_id/notes/:notes_id/' element={<Note/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
