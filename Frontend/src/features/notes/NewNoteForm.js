import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

const NewNoteForm = () => {
  const { id } = useParams();
  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <div>Loading...</div>
    );

  return content;
};

export default NewNoteForm;
