import { ThemeProvider } from "@emotion/react";
import React from "react";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import theme from './theme.mui'
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./pages/Search/Search";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="main-container">
        <main className="grid gap-16">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}

<Header />
export default App;
