import * as actorRepository from '../repositories/actor.repository.js';
import errorCodes from '../utils/errorCodes.util.js';
import saveImage from '../utils/saveImage.util.js';

export const createActor = async (actor)=>{
    try{
        const image =  await saveImage(actor.image, 'actors');
        if(!image)
            throw new ServiceError("Error saving image", errorCodes.IMAGES.NOT_FOUND);

        actor.image = image;
        const newActor = await actorRepository.createActor(actor);
        return newActor;
    }catch(e){
        throw new ServiceError(
            e.message || "Internal server error while creating actor",
            e.code || errorCodes.ACTOR.NOT_FOUND
        );
    }
}