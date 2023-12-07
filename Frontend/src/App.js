import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import Welcome from "./features/auth/Welcome";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        {/* /dash is the parent route for all the dashboard routes */}

        <Route path="/dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUserForm />} />
            <Route path=":userId" element={<EditUser />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path="new" element={<NewNote />} />
            <Route path=":noteId" element={<EditNote />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
