import { createTheme, TextFieldProps } from "@mui/material";
import { grey, red } from "@mui/material/colors";

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
    MuiCircularProgress: {
      variants: [{
        props: {},
        style: {
          color: mainColor
        }
      }]
    },
    MuiTextField: {
      variants: [{
        props: {},
        style: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              'border': '1px solid ' + grey[100]
            },
            '&:hover': {
              'border': '1px solid ' + grey[300]
            },
            'border': '1px solid ' + grey[500] ,
            color: "white"
          },
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