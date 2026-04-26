import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import userModel from '../models/user.model.js'



export const authenticateUser = async (req , res ,next) =>{
   const token = req.cookies.token;

    if(!token){
      res.status(401).json({ message : 'Unauthorized token not found', success : false })
    }

    try{
      const decoded = jwt.verify(token , config.JWT_SECRET_KEY)
      req.user = decoded;
      next();

    }catch(err){
      console.log(err)
      res.status(401).json({ message : 'Unauthorized', success : false })
    }

}

export const authenticateSeller = async (req , res ,next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({ message : 'Unauthorized token not found', success : false })
    }

    try{
      const decoded = jwt.verify(token , config.JWT_SECRET_KEY)
      const user = await userModel.findById(decoded.id) 

      if(!user){
        return res.status(401).json({message :'Unauthorized user not found' , success : false})
      }

      if(user.role !== 'seller'){
        return res.status(403).json({message : 'Forbidden not the seller' , success : false })
      }
      
      req.user = decoded
      next()
    
   }catch(err){
    console.log(err)
    res.status(401) .json({ message : 'Unauthorized', success : false })
   }

}