import * as actorRepository from "../repositories/actor.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import saveImage from "../utils/saveImage.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createActor = async (actor) => {
  try {
    const image = await saveImage(actor.image, "actors");
    if (!image)
      throw new ServiceError("Error saving image", errorCodes.IMAGES.NOT_FOUND);

    actor.image = image;
    const existingActor = await actorRepository.findActorByNameAndAge(
      actor.name,
      actor.age
    );
    if (existingActor)
      throw new ServiceError(
        "Actor already exists",
        errorCodes.ACTOR.ALREADY_EXISTS
      );

    const newActor = await actorRepository.createActor(actor);
    return newActor;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while creating actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
};

export const FindActors = async () => {
  try {
    const actors = await actorRepository.getActors();
    return actors;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while getting actors",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
};

export const updateOneActor = async (actorId, actor) => {
  try {
    if (actor.image) {
      const image = await saveImage(actor.image, "actors");
      if (!image)
        throw new ServiceError(
          "Error saving image",
          errorCodes.IMAGES.NOT_FOUND
        );

      actor.image = image;
    }
    const existingActor = await actorRepository.findActorById(actorId);
    if (!existingActor)
      throw new ServiceError(
        "Actor not existing",
        errorCodes.ACTOR.USER_NOT_EXISTS
      );

    const updatedActor = await actorRepository.updateActor(actorId, actor);
    return updatedActor;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while updating actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
};
