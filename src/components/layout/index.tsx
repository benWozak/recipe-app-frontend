import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./bottomNav";

type Props = {};

function Layout({}: Props) {
  return (
    <div data-theme="nord" className="mx-auto h-svh">
      <main className="flex flex-col justify-center items-center h-svh">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;
