import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const callApi = () => {
    axios
      .get("http://localhost:4000/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.message));
  };

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("tek: ", response.data);
    } catch (error) {
      console.error(error);
    }

    // axios
    //   .get("http://localhost:4000/protected")
    //   .then((res) => console.log(res.data))
    //   .catch((error) => console.log(error.message));
  };

  return (
    <div className="App">
      <h1>Auth0</h1>
      <ul>
        <li>
          <button onClick={() => loginWithPopup()}>Login with popup</button>
        </li>
        <li>
          <button onClick={() => loginWithRedirect()}>
            Login with redirect
          </button>
        </li>
        <li>
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? "authenticated" : "not authenticated"}</h3>

      <ul>
        <li>
          <button onClick={() => callApi()}>Call API</button>
        </li>
        <li>
          <button onClick={() => callProtectedApi()}>Call protected API</button>
        </li>
      </ul>
      {isAuthenticated && (
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
