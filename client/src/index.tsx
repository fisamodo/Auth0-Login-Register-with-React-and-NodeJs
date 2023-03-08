import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rf72tle4noplz84p.us.auth0.com"
      clientId="FVd4r7LTfeLwiYJVNZtiZEKHAUjetiNQ"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "myIndetifier",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
