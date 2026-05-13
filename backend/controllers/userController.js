import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// register uesr
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "already exist" });
    }

    //validating emial format & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "enter a valid email" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "password is not valid" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "error occurred" });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ seccess: false, message: "invalid emial or password" });
    }
    const token = createToken(user._id);

   return res
      .status(200)
      .json({ success: true, message: "login successfully", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "error!" });
  }
};

export { registerUser, loginUser };
