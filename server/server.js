const express = require("express");
const cors = require("cors");
var { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const { response } = require("express");

const app = express();
app.use(cors());

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-rf72tle4noplz84p.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "myIndetifier",
  issuer: "https://dev-rf72tle4noplz84p.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(verifyJwt);

app.get("/", (req, res) => {
  res.send("Hello from index route");
});

app.get("/protected", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-rf72tle4noplz84p.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = response.data;

    res.send(userInfo);
  } catch (error) {
    res.send(error.message);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

app.listen(4000, () => console.log("server on port 4000"));
