import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import axios from "axios";
import customFetch from "./utils/customFetch.js";

// const resp = await axios.get("/api/v1/test");
const resp = await customFetch.get("/test");
console.log(resp);
// fetch("http://localhost:5100/api/v1/test")
// fetch("/api/v1/test")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     console.log("test123");
//   });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
