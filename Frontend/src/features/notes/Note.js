import { fontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.created).toLocaleString("en-NZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const updated = new Date(note.updated).toLocaleString("en-NZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
    return (
      <tr className="table__row">
        <td className="table__cell note_status">
          {note.completed ? (
            <span className="note_status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>
        <td className="table__cell note__edit">
          <button className="table__cell" onClick={handleEdit}>
            <fontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};
export default Note;
