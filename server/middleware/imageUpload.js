const multer = require("multer");
const { v4: uuid } = require("uuid"); // unique한 아이디 생성
const mime = require("mime-types"); // req 이미지의 타입 지정

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

module.exports = { upload };
