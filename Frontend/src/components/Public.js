import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <>
      <header>
        <h1>Welcome to my website</h1>
      </header>
      <main>
        <p>
          This is a website that I have created to showcase my skills as a
          developer. I have used React, Node, Express, and MongoDB to create
          this website.
        </p>
        <div>
          <Link to={"/dash"}>Go to main App</Link>
        </div>
      </main>
    </>
  );
  return content;
};

export default Public;
