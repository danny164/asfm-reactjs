import React from "react";
import ReactDOM from "react-dom";
import Application from "./conponents/Application";
import "./assets/css/all.min.css";
import "./assets/css/plugins.css";
import "./assets/css/styles.css";
import "./assets/css/theme.css";

ReactDOM.render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
    document.getElementById("root")
);
