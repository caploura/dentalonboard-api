const express = require("express");
const router = express.Router();

router.post("/email", (req, res, next) => {
  console.log(`Received the following message:`);
  console.log(JSON.stringify(req.body));
  res.sendStatus(200);
});

module.exports = router;
