import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";




const tokenInResponse = (user, res, message) => {
  
  const token = jwt.sign(
    { id: user._id }, 
    config.JWT_SECRET_KEY, 
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: config.NODE_ENV === "production",
  });

  user.password = undefined;

  res.status(200).json({
    message: message,
    user: {
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
};


/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
const registerUser = async (req, res) => {
  const { fullname, contact, email, password, isSeller } = req.body;

  try {
    const userExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      fullname,
      contact,
      email,
      password,
      role: isSeller ? "seller" : "buyer",
    });

    tokenInResponse(user, res, "User registered successfully")


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "server error",
    });
  }
};




/** 
 *  @route POST /api/auth/login
 *  @description Login a user
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
        
      });
    }

    tokenInResponse(user, res, "Login successful")


  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server error",
     
    })
  }
}






export { registerUser  , loginUser}
