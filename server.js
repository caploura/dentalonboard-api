const express = require("express");
const http = require("http");

const api = require("./server/routes/api");
const app = express();
app.use(express.json());

app.get("/error/*", (req, res) => {
  res.status(400);
  res.send("Error");
});

app.use("/dentalonboard-api", api);

app.get("*", (req, res) => {
  res.status(404);
  res.send("Not Found");
});

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
