const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../model/userSchema");

//function
const signup = async (req, resp) => {
  const { username, password, fullName, role } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return resp.status(400).json({ message: "already exists", data: null });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      username,
      password: hashedPassword,
      fullName,
      role,
      isActive: true,
    });
    await createdUser.save();
    resp.status(201).json({ message: "User saved", data: null });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const login = async (req, resp) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return resp.status(404).json({ message: "User not found", data: null });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return resp.status(403).json({ message: "Wrong password", data: null });
    }

    // Generate JWT token
    const payload = {
      userId: userExists._id,
      username: userExists.username,
      role: userExists.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return resp
      .status(200)
      .json({ message: "Login successful", data: { token } });
  } catch (error) {
    return resp.status(500).json({ error: e.message });
  }
};

module.exports = { signup, login };
