const express = require("express");

const app = express();
const PORT = 5000;

app.post("/upload", (req, res) => {});

app.listen(PORT, () => {
  console.log("express server listening on PORT" + PORT);
});
