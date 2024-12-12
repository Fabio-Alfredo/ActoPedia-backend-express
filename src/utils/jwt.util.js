import jwt from "jsonwebtoken";
import { config } from "../configs/config.js";

const generateToken = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  const expires_in = new Date().getTime() + 86400000;

  return {
    token,
    expires_in,
  };
};

const verifyToken=(token)=>{
    try{
        const data = jwt.verify(token, config.jwtSecret);
        return data;
    }
    catch(e){
        return null
    }
}

export default {
    generateToken,
    verifyToken
}