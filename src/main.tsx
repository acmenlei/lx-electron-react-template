import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import DragHandle from "@/components/DragHandle";

import "@/assets/css/index.css";
import "@/assets/css/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <App />
    <DragHandle />
  </HashRouter>
);

postMessage({ payload: "removeLoading" }, "*");
