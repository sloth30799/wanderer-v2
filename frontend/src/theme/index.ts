import { createTheme } from "@mui/material/styles"

const rootElement = document.getElementById("root")

export const theme = createTheme({
  palette: {
    primary: {
      main: "#e6a02d",
      light: "#e6a02d",
      dark: "#a1701f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#59a9a1",
      light: "#8ddad5",
      dark: "#1f766f",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "py-1 px-4",
          fontSize: "0.75rem",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  typography: {
    fontFamily: ["Archivo", "Pilcrow Rounded", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
})
