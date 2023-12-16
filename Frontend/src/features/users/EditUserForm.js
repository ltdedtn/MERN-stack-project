import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const onActiveChanged = () => setActive((prev) => !prev);

  const handleRoleSelection = (e) => {
    const roles = e.target.value;
    setRoles(roles);
    setRoles([roles]);
  };

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async (e) => {
    e.preventDefault();
    await deleteUser(user.id);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "" : "error";
  const validPasswordClass = !validPassword ? "" : "error";
  const validRolesClass = !Boolean(roles.length) ? "" : "error";

  const errorContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content =
    ((<p className={errClass}>{errorContent}</p>),
    (
      <div className="pt-8 relative flex flex-col justify-center">
        <div className="p-6 m-auto bg-grey rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
          <form className="space-y-4">
            <div>
              <h2>Edit User</h2>
            </div>
            <div>
              <label className="label" htmlFor="username">
                Username:
              </label>
              <input
                className={`w-full input input-bordered ${validUserClass}`}
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onUsernameChanged}
                autoComplete="off"
                placeholder={user.username}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password: <span className="nowrap"></span>
              </label>
              <input
                className={`w-full input input-bordered ${validPasswordClass}`}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onPasswordChanged}
                autoComplete="off"
                placeholder="Password"
              ></input>
            </div>

            <div>
              <label className="label " htmlFor="user-active">
                ACTIVE:
                <input
                  className="toggle toggle-success"
                  id="user-active"
                  name="user-active"
                  type="checkbox"
                  checked={active}
                  onChange={onActiveChanged}
                />
              </label>
            </div>
            <label className="lable" htmlFor="roles">
              Current Role:
            </label>
            <div className="dropdown dropdown-right">
              <div tabIndex="0" role="button" className="btn m-1">
                {roles ? (
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span>{roles}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  "Select a Role"
                )}
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {options.map((role, index) => (
                  <li
                    key={index}
                    onClick={handleRoleSelection}
                    className={`${validRolesClass}`}
                    id="roles"
                    name="roles"
                    multiple={true}
                    value={roles}
                    onChange={onRolesChanged}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
            <br />
            <button
              className="btn btn-error btn-block"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              Delete
            </button>
            <div>
              <button
                className="form btn btn-primary btn-block"
                title="Update"
                onClick={onSaveUserClicked}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    ));
  return content;
};

export default EditUserForm;
