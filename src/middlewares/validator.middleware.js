import { validationResult } from "express-validator";

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const errorsMessages = errors.array().map((e)=>e.msg);
        return res.status(400).json({errors:errorsMessages});
    }
    next();
};


export default runValidation;