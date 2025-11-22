import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import App from "./App.jsx";
import "./index.css";

const GOOGLE_CLIENT_ID =
  "319112153240-iam86e1ca0a0rgvh0b8tq92imde2ve23.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
