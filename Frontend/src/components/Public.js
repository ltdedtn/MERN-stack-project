import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <section>
      <header>
        <h1>Welcome to my website</h1>
      </header>
      <main>
        <p>
          This is a website that I have created to showcase my skills as a
          developer. I have used React, Node, Express, and MongoDB to create
          this website.
        </p>
      </main>
      <footer>
        <Link to="/login">Login Page</Link>
        <Link to="dash/users/new">Dont have an account?</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
