import { sign, verify } from "jsonwebtoken";
import { config } from "../configs/config";

const generateToken = (payload) => {
  const token = sign(payload, config.jwtSecret, { expiresIn: "1d" });
  const expires_in = new Date().getTime() + 86400000;

  return {
    token,
    expires_in,
  };
};

const verifyToken=(token)=>{
    try{
        const data = verify(token, config.jwtSecret);
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