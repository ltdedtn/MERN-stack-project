import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "./usersApiSlice";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const onDeleteUserClicked = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      await deleteUser(user.id);
    }
  };
  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "bg-base-200";

    return (
      <tr key={user.id} className="table__row user">
        <td className={` ${cellStatus}`}>{user.username}</td>
        <td className={` ${cellStatus}`}>{userRolesString}</td>
        <td className={` ${cellStatus}`}>
          <button className="btn btn-neutral" onClick={handleEdit}>
            Update
          </button>
        </td>
        <td className={` ${cellStatus}`}>
          <button
            className="btn btn-error"
            title="Delete"
            onClick={onDeleteUserClicked}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default User;
