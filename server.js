const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

const listenPort = 4144;

const globalUsers = {};
const globalPositions = {};

const generateId = (length) => {
  const chars = "qwertyuiopasdfghjklmnbvcxz";
  let id = "";
  for (let i = 0; i < length; i++) {
    const iChar = Math.floor(Math.random() * chars.length);
    id = id + chars[iChar];
  }
  return id;
};

app.get("/recognize-returning", (req, res) => {
  console.log("GET/recognize-returning");
  console.log(req.cookies.uid);
  if (globalUsers[req.cookies.uid] !== undefined) {
    payload = {
      success: true,
      displayName: globalUsers[req.cookies.uid],
    };
    res.send(JSON.stringify({ payload }));
    return;
  } else {
    const newId = generateId(10);
    console.log("new user id", newId);
    res.cookie("uid", newId);
    globalUsers[newId] = null;
    res.send(JSON.stringify({ success: false, msg: "unknown user" }));
  }
});

app.post("/set-username", upload.none(), (req, res) => {
  console.log("POST/set-username");
  console.log(req.cookies.uid);
  if (globalUsers[req.cookies.uid] !== undefined) {
    const request = JSON.parse(req.body.request);
    globalUsers[req.cookies.uid] = request.newUser;
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false, msg: "unknown user" }));
});

app.post("/set-location", upload.none(), (req, res) => {
  //if (globalUsers[req.cookies.uid] !== undefined) {
  const position = JSON.parse(req.body.position);
  globalPositions[req.body.id] = position;
  console.log(globalPositions);
  res.send(JSON.stringify({ success: true }));
  return;
  //}
  //res.send(JSON.stringify({ success: false, msg: "unknown user" }));
});

app.get("/location", (req, res) => {
  console.log("get loc for", req.query.id);
  res.send(JSON.stringify(globalPositions[req.query.id]));
});

app.listen(listenPort, () => {
  console.log(`server up on port ${listenPort}`);
});
