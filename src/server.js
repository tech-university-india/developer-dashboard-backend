/* eslint-disable quotes */
const express = require("express");
const config = require("config");
const Router = require("./routes/dashRouter");
const app = express();
const port = 3000;
const {verifyJWT} = require("./middlewares/auth");
const auth = require("./routes/auth.js");


if(!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.use(express.json());
app.use("/auth", auth);
app.use("/", verifyJWT, (req, res)=>{
  res.send("Hello World");
});
app.use("/", Router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);