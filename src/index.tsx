import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import theme from "./theme/theme.mui";
import { ThemeProvider } from "@emotion/react";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);