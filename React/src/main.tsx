import { User } from "oidc-client-ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import App from "./App";
import "./index.css";

// Cleans the url after redirection with the code
function onSigninCallback(_user: User | void): void {
  window.history.replaceState({}, document.title, window.location.pathname);
}

const oidcConfig: AuthProviderProps = {
  // Url to the identity server
  authority: "https://localhost:5001",
  client_id: "reactClient",
  // Current url
  redirect_uri: "https://127.0.0.1:5173",
  // Current url
  post_logout_redirect_uri:"https://127.0.0.1:5173",
  response_type: "code",
  // Should match the scopes in the identity server
  scope: "openid profile AimyAuth email",
  onSigninCallback:onSigninCallback,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
