import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import theme from "./theme.mui";
import { ThemeProvider } from "@emotion/react";
import MoviePage from "./pages/MoviePage/MoviePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
