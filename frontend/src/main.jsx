// Entry point: mount the <App /> component into <div id="root"> in index.html
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(<App />);
