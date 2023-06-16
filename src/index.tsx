import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { MainScreen } from "./main/MainScreen"
import { AnimatedBackground } from "./main/BirdsBackground"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <AnimatedBackground />
    <MainScreen />
  </React.StrictMode>
)
