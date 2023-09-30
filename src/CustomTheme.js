import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D88A3B",
      lightBg: "#FCF7F1",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#D5802B",
      light: "#F3F6F9"
    },
    text: {
      primary: "#252525",
      secondary: "#314451"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    },
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
    h1: {
      fontSize: "4.5rem",
      fontWeight: 700
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 700
    },
    h3: {
      fontSize: "1.9rem",
      fontWeight: 700
    },
    h4: {
      fontSize: "1.625rem",
      fontWeight: 600
    },
    h5: {
      fontSize: "1.525rem",
      fontWeight: 500
    },
    h6: {
      fontSize: "1.325rem",
      fontWeight: 500
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff"
        }
      }
    }
  }
});

export default CustomTheme;
