import User from "../Models/userModel.js";
import createSecretToken from "../utils/secretToken.js";

export default {
  async Signup(req, res) {
    try {
      const { email, password, username, createdAt } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await new User({ email, username, createdAt });
      await User.register(user, password);
      const token = createSecretToken(user._id);
      res
        .status(201)
        .json({ message: "User signed updd successfully", success: true, user });
    } catch (error) {
      res.status(400).json({ errors: error });
    }
  },

  async Login(req, res) {
    res.json({ message: "Login successful", user: req.user });
  },

  // Logout Route
  async Logout(req, res) {
    req.logout((err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Logout successfully!" });
    });
  },
};
