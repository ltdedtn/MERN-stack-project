import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm.js";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  const content = users ? <NewNoteForm users={users} /> : <div>Loading...</div>;

  return content;
};

export default NewNote;
