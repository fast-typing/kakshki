import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <main className="grid gap-16">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;