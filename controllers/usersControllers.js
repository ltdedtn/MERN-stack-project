const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    res.status(404).json({ message: "No users found" });
  }
  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !roles.length || !Array.isArray(roles)) {
    res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    res.status(409).json({ message: "Username already exists" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPwd, roles };

  const newUser = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  if (
    (id,
    username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean")
  ) {
    res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    res.status(409).json({ message: "Username already exists" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "All fields are required" });
  }
  const notes = await Note.find({ user: id }).lean().exec();
  if (notes.length) {
    await Note.deleteMany({ user: id }).exec();
  }
  const user = await User.findById(id).exec();
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} has been deleted`;
  res.json(reply);
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
