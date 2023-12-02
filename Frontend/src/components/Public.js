import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to my website</h1>
      </header>
      <main className="public__main">
        <p>
          This is a website that I have created to showcase my skills as a
          developer. I have used React, Node, Express, and MongoDB to create
          this website.
        </p>
      </main>
      <footer>
        <Link to="/login">Login Page</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
