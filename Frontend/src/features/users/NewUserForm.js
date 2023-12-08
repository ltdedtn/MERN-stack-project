import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
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
      <form>
        <div className="form" onSubmit={onSaveUserClicked}>
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-30 Letters]</span>
        </label>
        <br />
        <input
          className={`form__input ${validUserClass}`}
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onUsernameChanged}
          autoComplete="off"
          placeholder="Username"
        />
        <br />
        <br />
        <label className="form__label" htmlFor="password">
          Password:{" "}
          <span className="nowrap">
            [6-30 Letters, must include lower and uppercase also one of these
            characters !@#$%^&*]
          </span>
          <br />
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
          autoComplete="off"
          placeholder="Password"
        ></input>{" "}
        <br />
        <label className="form__lable" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <br />
        <select
          className={`form__input ${validRolesClass}`}
          id="roles"
          name="roles"
          multiple={true}
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={onSaveUserClicked}
        disabled={!canSave}
      >
        Create User
      </button>
    </>
  );
  return content;
};

export default NewUserForm;
