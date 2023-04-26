import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "react-hot-toast"
import "./assets/main.css"
import { theme } from "./theme"
import { store } from "./services/store"
import App from "./App"

const rootElement = document.getElementById("root")
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <AnimatePresence>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
              <Toaster />
            </ThemeProvider>
          </AnimatePresence>
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  )
}
