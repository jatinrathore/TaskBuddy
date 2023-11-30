import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { TaskContextWrapper } from "./hooks/useTasks.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskContextWrapper>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </TaskContextWrapper>
);
