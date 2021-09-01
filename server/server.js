const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads" }); // 이미지의 정보를 req 객체에서 뽑아 uploads 폴더에 저장하주는 미들웨어

const app = express();
const PORT = 5000;

app.post("/upload", upload.single("imageTest"), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log("express server listening on PORT" + PORT);
});
