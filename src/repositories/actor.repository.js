import Actor from "../models/actor.model.js";

export const findActorById = async (actorId) => {
  return Actor.findById(actorId);
};

export const createActor = async (actor) => {
  const newActor = new Actor(actor);
  return newActor.save();
};

export const updateActor = async (actorId, actor) => {
  return Actor.findByIdAndUpdate({ _id: actorId }, actor, { new: true });
};

export const getActors = async () => {
  return Actor.find().populate("movies.movie", "title");
};

export const addMovie = async (actorId, movieId, personaje) => {
  return Actor.findByIdAndUpdate(
    { _id: actorId },
    { $addToSet: { movies: { movie: movieId, personaje } } },
    { new: true }
  );
};

export const findActorByNameAndAge = async (name, age) => {
  return Actor.findOne({ name, age });
};
