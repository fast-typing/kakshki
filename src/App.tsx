import { ThemeProvider } from "@emotion/react";
import React from "react";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import theme from './theme.mui'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
