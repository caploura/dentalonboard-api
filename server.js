const express = require("express");
const http = require("http");
const cors = require("cors");
const api = require("./server/routes/api");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/dentalonboard-api", api);

app.get("/error/*", (req, res) => {
  res.sendStatus(400);
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
