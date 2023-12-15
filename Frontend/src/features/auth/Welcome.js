import { Link } from "react-router-dom";

const Welcome = () => {
  const content = (
    <>
      <b>Welcome to the dashboard</b>
      <p>
        <Link to="/dash/users">View Users</Link>
      </p>
      <p>
        <Link to="/dash/users/new">Create a new User</Link>
      </p>
    </>
  );

  return content;
};
export default Welcome;
