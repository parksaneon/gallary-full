const { Router } = require("express");
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

// upload.single("image") 라는 미들웨어를 사용함으로서 req에서 데이터에 접근이 가능
imageRouter.post("/images", upload.single("image"), async (req, res) => {
  const image = await new Image({
    key: req.file.filename,
    originalname: req.file.originalname,
  }).save();
  res.json(image);
});
imageRouter.get("/images", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

module.exports = { imageRouter };
