import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    color: string,
  }

  interface ThemeOptions {
    color: string,
  }
}

const mainColor = red[700]
const hoverColor = red[900]

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: mainColor,
            color: "white",
            '&:hover': {
              backgroundColor: hoverColor
            }
          }
        },
        {
          props: { variant: "outlined" },
          style: {
            border: '2px solid ' + mainColor,
            backgroundColor: "transparent",
            color: mainColor,
            '&:hover': {
              backgroundColor: mainColor,
              border: '2px solid ' + mainColor,
              color: "white"
            }
          }
        },
      ]
    },
    MuiInputLabel: {
      variants: [{
        props: {},
        style: {
          color: "white",
          '&.Mui-focused': {
            color: "white",
            fontWeight: 500,
          }
        }
      }]
    },
    MuiIconButton: {
      variants: [{
        props: {},
        style: {
          color: "white",
          backgroundColor: mainColor,
          '&:hover': {
            backgroundColor: hoverColor
          }
        }
      }]
    },
    MuiSelect: {
      variants: [{
        props: {},
        style: {
          color: "white",
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused fieldset': {
            borderColor: mainColor + '!important'
          },
          '& svg': {
            color: 'white'
          }
        }
      }]
    },
    MuiSvgIcon: {
      variants: [{
        props: {},
        style: {
          color: "white",
        }
      }]
    }
  },
  typography: {
    'fontFamily': 'Montserrat',
    'fontSize': 13
  },
  color: mainColor
});

export default theme