import { Link } from "react-router-dom";

const Welcome = () => {
  const content = (
    <section className="welcome">
      <h1>Welcome to the Dashboard</h1>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/users">View Users</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
