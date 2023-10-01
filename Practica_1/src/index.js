const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/home", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/index`, router);

module.exports = app;
module.exports.handler = serverless(app);