const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 6)
      throw new Error("비밀번호는 최소 6자 이상입니다 :)");
    else if (req.body.username.length < 3)
      throw new Error("이름은 최소 3자 이상입니다 :)");
    const hashedPassword = hash(req.body.password, 10);
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
      sessions: [{ createAt: new Date() }],
    }).save();
    const session = user.sessions[0];
    res.json({
      message: "user registered",
      sessionId: session._id,
      name: user.name,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req, body.password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
    user.sessions.push({ createAt: new Date() });
    const session = user.sessions[user.sessions.length - 1];
    await user.save();
    res.json({
      message: "user validated",
      sessionId: session._id,
      name: user.name,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    const { sessionId } = req.headers;
    if (mongoose.isValidObjectId(sessionId))
      throw new Error("invalid sessionId");
    const user = await User.findOne({ "sessions._id": sessionId });
    if (!user) throw new Error("invalid sessionId");
    await User.updateOne(
      { _id: user.id },
      { $pull: { sessions: { _id: sessionId } } }
    );
    res.json({ message: "user is logged out" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
