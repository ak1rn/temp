const express = require("express");

const fun = require("./req");

const app = express();
const PORT = 3000;

let status = 200;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(status).send(`<h1>Hello World!</h1><h2>Status: ${status}</h2>`);
});

app.get("/config", (req, res) => {
  const { statusCode, cpuTime } = req.query;

  const startTime = Date.now();

  while (Date.now() - startTime < 1000 * cpuTime) {
    Math.sqrt(Math.random() * Math.random());
  }

  if (statusCode) status = parseInt(statusCode);

  res.send(`Set status code to ${status} and ran cpu for ${cpuTime} seconds`);
});

app.get("/break/:code", (req, res) => {
  const code = req.params.code;
  status = parseInt(code);
  res.send(`Set status to ${status}`);
});

app.get("/break", (req, res) => {
  res.send(`Goto /break/:code`);
});

app.get("/good", (req, res) => {
  status = 200;
  res.send(`Set status to ${status}`);
});

app.get("/send-requests", (req, res) => {
  const data = req.body;
  fun(data.API_URL, data.rps);
  res.send("Huh");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
