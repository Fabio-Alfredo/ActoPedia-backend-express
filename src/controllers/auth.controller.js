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