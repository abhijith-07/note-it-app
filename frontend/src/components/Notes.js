import { Link } from "react-router-dom";


export const Notes = (props) => {
    const linkToNote = `${props.id}/`;
 

    return (
        <Link to={linkToNote} style={{ textDecoration: "none" }}>
          <div className="box file-box document-box">
            <h3 className="note-heading">{props.title}</h3>
            <hr />
            <p className="description">{props.description}</p>
            <div className="notes-info-footer">
              <div className="updated-date">Last updated: {props.date}</div>
            </div>
          </div>
        </Link>      
    );
  }