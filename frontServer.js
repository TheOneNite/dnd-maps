const express = require("express");
const app = express();

const listenPort = 3133;

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.all("/*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(listenPort, () => {
  console.log(`frontend out on port ${listenPort}`);
});
