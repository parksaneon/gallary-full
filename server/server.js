require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid"); // unique한 아이디 생성
const mime = require("mime-types"); // req 이미지의 타입 지정
const mongoose = require("mongoose");
const Image = require("./models/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, ` ${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    // 이미지의 타입이 png혹은 jpeg면 이미지 저장
    else cb(new Error("invalid type"), false);
  },
  limits: {
    fieldSize: 1024 * 1024 * 5, // 5mb 로 이미지의 용량을 제한
  },
}); // 이미지의 정보를 req 객체에서 뽑아 uploads 폴더에 저장하주는 미들웨어

const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParse: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected!");
    // DB가 연결되면 서버가 실행되도록
    app.use("/uploads", express.static("uploads"));

    // upload.single("image") 라는 미들웨어를 사용함으로서 req에서 데이터에 접근이 가능
    app.post("/upload", upload.single("image"), async (req, res) => {
      await new Image({
        ket: req.file.filename,
        originalname: req.file.originalname,
      }).save();
      res.json(req.file);
    });
    app.listen(PORT, () => {
      console.log("express server listening on PORT" + PORT);
    });
  })
  .catch((error) => console.log(error));
