import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["User"]);
  const [selectedRole, setSelectedRole] = useState("User");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const handleRoleSelection = (e) => {
    const selectedRole = e.target.value;
    setSelectedRole(selectedRole);
    setRoles([selectedRole]);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) await addNewUser({ username, password, roles });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPasswordClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-grey rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
          <form className="space-y-4">
            <div className="form" onSubmit={onSaveUserClicked}>
              <h2>New User</h2>
            </div>
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
              placeholder="Username"
            />
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
            ></input>{" "}
            <label className="lable" htmlFor="roles">
              ASSIGNED ROLES:
            </label>
            <br />
            <div className="dropdown dropdown-right">
              <div tabIndex="0" role="button" className="btn m-1">
                {roles ? roles : "Select a Role"}
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {options.map((role) => (
                  <li
                    key={role}
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
            <div>
              <button
                className="btn btn-block"
                type="submit"
                onClick={onSaveUserClicked}
                disabled={!canSave}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  return content;
};

export default NewUserForm;
