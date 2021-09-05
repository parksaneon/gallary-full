const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 6)
      throw new Error("비밀번호는 최소 6자 이상입니다 :)");
    else if (req.body.username.length < 3)
      throw new Error("이름은 최소 3자 이상입니다 :)");
    const hashedPassword = hash(req.body.password, 10);
    await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
    }).save();
    res.json({ message: "user registered" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req, body.password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
    res.json({ message: "user validated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
