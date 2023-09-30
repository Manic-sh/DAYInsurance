import { observer } from "mobx-react-lite";
import Routes from "./Routes";
import { RootStore } from "./store";
import "./App.scss";
import CustomTheme from "./CustomTheme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const store = RootStore.create({
  page: {},
  insurance: {},
  quotes: {},
  proposal: {},
  login: {},
});
const App = observer((props) => {
  return (
    <>
      <ThemeProvider theme={CustomTheme}>
      <ToastContainer />
        <CssBaseline />
        <Routes {...props} store={store} />
      </ThemeProvider>
    </>
  );
});

export default App;
