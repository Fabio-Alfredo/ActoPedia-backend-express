import Actor from "../models/actor.model.js";

export const findActorById = async (actorId) => {
  return await Actor.findById(actorId);
};

export const createActor = async (actor, userId) => {
  const newActor = new Actor(actor);
  return await newActor.save();
};

export const updateActor = async (actorId, actor) => {
  return await Actor.findByIdAndUpdate({ _id: actorId }, actor, { new: true });
};

export const getActors = async () => {
  return await Actor.find().populate("movies.movie", "title");
};

export const addMovie = async (actorId, movieId, personaje) => {
  return await Actor.findByIdAndUpdate(
    { _id: actorId },
    { $addToSet: { movies: { movie: movieId, personaje } } },
    { new: true }
  );
};

export const findActorByNameAndAge = async (name, age) => {
  return await Actor.findOne({ name, age });
};
