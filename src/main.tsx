import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";

const domNode = document.querySelector("#root") as HTMLElement;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
