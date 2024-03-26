const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await userModel.findOne({ email: email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      phone: req.body.phone,
      gender: req.body.gender
    });
    res.status(201).json(user.id);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            phone: user.phone,
            gender: user.gender
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "5m" }
      );
      res.status(200).json(accessToken);
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUser,
  userRegister,
  loginUser
}
