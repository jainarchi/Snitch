import { config } from "dotenv";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";



const tokenInResponse = (userId) => {

  return token = jwt.sign(
    { id: userId }, 
    config.JWT_SECRET_KEY,
    { expiresIn: "7d"}
  )
}



const registerUser = async (req, res) => {
  const { fullname, contact, email, password, role } = req.body;

  try {
    const userExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    const user = await userModel.create({
      fullname,
      contact,
      email,
      password,
      role,
    })

    res.status(201).json({
      message: "User registered successfully",
    })


  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "server error",
    })
  }

}


export {
    registerUser
}