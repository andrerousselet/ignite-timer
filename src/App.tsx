import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { TimerContextProvider } from "./contexts/TimerContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TimerContextProvider>
        <Router />
      </TimerContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
