const express = require("express");
const app = express();

const listenPort = 3133;

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(listenPort, () => {
  console.log(`frontend out on port ${listenPort}`);
});
