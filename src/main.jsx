import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
