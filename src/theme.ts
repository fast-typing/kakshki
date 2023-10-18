import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    color: string,

  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    color: string,
  }
}

const theme = createTheme({
  color: orange[500],
});

export default theme