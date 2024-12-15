import *as actorService from '../services/actor.service.js';
import createHttpError from 'http-errors';
import errorCodes from '../utils/errorCodes.util.js';

export const createActor = async (req, res, next)=>{
    try{
        const actor = req.body;
        actor.image = req.files[0];
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

export const getActors = async (req, res, next)=>{
    try{
        const acators = await actorService.FindActors();
        res.status(200).json(acators);
    }catch(e){
        switch(e.code){
            case errorCodes.ACTOR.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}