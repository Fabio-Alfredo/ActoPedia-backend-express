import Actor from "../models/actor.model.js";

export const createActor = async (actor)=>{
    const newActor = new Actor(actor);
    return newActor.save();
}

export const updateActor = async(actorId, actor)=>{
    return Actor.findByIdAndUpdate({_id: actorId}, actor, {new: true});
}

export const getActors = async ()=>{
    return Actor.find().populate('movies');
}

export const addMovie = async (actorId, movie)=>{
    return Actor.findByIdAndUpdate({_id: actorId}, {$addToSet: {movies: movie}});
}