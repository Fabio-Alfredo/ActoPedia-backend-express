import mongoose from "mongoose";
import * as actorRepository from "../repositories/actor.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import saveImage from "../utils/saveImage.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createActor = async (actor, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
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

    actor.createFor = { user: user._id, date: new Date() };

    const newActor = await actorRepository.createActor(actor, opts);
    await session.commitTransaction();
    return newActor;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while creating actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  } finally {
    await session.endSession();
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

export const updateOneActor = async (actorId, actor, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
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
    const updatedActor = await actorRepository.updateActor(
      actorId,
      actor,
      user._id,
      opts
    );
    await session.commitTransaction();
    return updatedActor;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const existingActor = async (actorId) => {
  try {
    const actor = await actorRepository.findActorById(actorId);
    if (!actor)
      throw new ServiceError(
        "Actor not existing",
        errorCodes.ACTOR.ACTOR_NOT_EXISTS
      );
    return actor;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while getting actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
};

export const addMovieInActor = async (actorId, movieId, personaje, opts) => {
  try {
    const updateActor = await actorRepository.addMovie(
      actorId,
      movieId,
      personaje,
      opts
    );
    return updateActor;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while adding movie to actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
};

export const getActorById = async (actorId) => {
  try{
    const actor = await actorRepository.findActorById(actorId);
    if(!actor)
      throw new ServiceError(
        "Actor not found",
        errorCodes.ACTOR.ACTOR_NOT_EXISTS
      );
    return actor;
  }catch(e){
    throw new ServiceError(
      e.message || "Internal server error while getting actor",
      e.code || errorCodes.ACTOR.NOT_FOUND
    );
  }
}