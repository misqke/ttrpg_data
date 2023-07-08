import React from "react";
import NavBar from "./NavBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
