import { Outlet } from "react-router-dom";

import React from "react";

const Layout = () => {
  return (
    <div className="w-screen h-screen" data-theme="dark">
      <Outlet />
    </div>
  );
};

export default Layout;
