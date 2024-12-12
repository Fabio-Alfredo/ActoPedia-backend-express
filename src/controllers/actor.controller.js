import *as actorService from '../services/actor.service.js';
import createHttpError from 'http-errors';
import errorCodes from '../utils/errorCodes.util.js';

export const createActor = async (req, res, next)=>{
    try{
        const actor = req.body;
        console.log(actor);
        const newActor = await actorService.createActor(actor);
        res.status(201).json(newActor);
    }catch(e){
        switch(e.code){
            case errorCodes.ACTOR.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            case errorCodes.IMAGES.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}