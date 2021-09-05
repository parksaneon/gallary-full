require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();

const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParse: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected!");
    // DB가 연결되면 서버가 실행되도록
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT, () => {
      console.log("express server listening on PORT" + PORT);
    });
  })
  .catch((error) => console.log(error));
