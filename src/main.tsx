import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { TaskContextWrapper } from "./hooks/useTasks.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskContextWrapper>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </TaskContextWrapper>
  </React.StrictMode>
);
