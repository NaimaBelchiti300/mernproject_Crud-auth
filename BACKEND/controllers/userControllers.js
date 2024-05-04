

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "remplir tous les champs" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "utilisateur existe deja" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const createdUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (createdUser) {
    return res.status(201).json({ message: "your acount crée avec succes" });
  } else {
    return res
      .status(400)
      .json({ message: "utilisateur non crée donne invalide" });
  }
});

// Authenticate a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
    
  } else {
    return res.status(400).json({ message: "email ou mot de passe incorrect" });
  }
});

// Return user
const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getMe };
