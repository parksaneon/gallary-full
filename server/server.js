const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid"); // unique한 아이디 생성
const mime = require("mime-types"); // req 이미지의 타입 지정

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, ` ${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({ dest: "uploads" }); // 이미지의 정보를 req 객체에서 뽑아 uploads 폴더에 저장하주는 미들웨어

const app = express();
const PORT = 5000;

// upload.single("imageTest") 라는 미들웨어를 사용함으로서 req에서 데이터에 접근이 가능
app.post("/upload", upload.single("imageTest"), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log("express server listening on PORT" + PORT);
});
