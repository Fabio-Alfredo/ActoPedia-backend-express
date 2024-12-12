import *as userService from '../services/user.service.js';
import createHttpError from 'http-errors';
import errorCodes from '../utils/errorCodes.util.js';

export const register = async (req, res, next)=>{
    try{
        const user = req.body;
        const newUser = await userService.createUser(user);
        res.status(201).json(newUser);
    }catch(e){
       
        switch(e.code){
            case errorCodes.USER.ALREADY_EXISTS:
                next(createHttpError(409, e.message));
                break;
            case errorCodes.USER.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}

export const login = async (req, res, next)=>{
    try{
        const {identifier, password}= req.body;
        const token = await userService.authenticateUser(identifier, password);
        res.status(200).json({token});
    }catch(e){
        switch(e.code){
            case errorCodes.USER.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case errorCodes.USER.INVALID_PASSWORD:
                next(createHttpError(401, e.message));
                break;
            case errorCodes.USER.ERROR_LOGIN:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}