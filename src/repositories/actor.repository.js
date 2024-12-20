import Actor from "../models/actor.model.js";

export const findActorById = async (actorId) => {
  return await Actor.findById(actorId);
};

export const createActor = async (actor, opts) => {
  const newActor = new Actor(actor);
  return await newActor.save(opts);
};

export const updateActor = async (actorId, actor, userId, opts) => {
  return await Actor.findByIdAndUpdate(
    { _id: actorId },
    {
      ...actor,
      $push: {
        updateFor: {
          user: userId,
          date: Date.now(),
        },
      },
    },
    { new: true, opts }
  );
};

export const getActors = async () => {
  return await Actor.find().populate("movies.movie", "title");
};

export const addMovie = async (actorId, movieId, personaje, opts) => {
  return await Actor.findByIdAndUpdate(
    { _id: actorId },
    { $addToSet: { movies: { movie: movieId, personaje } } },
    { new: true, opts }
  );
};

export const findActorByNameAndAge = async (name, age) => {
  return await Actor.findOne({ name, age });
};