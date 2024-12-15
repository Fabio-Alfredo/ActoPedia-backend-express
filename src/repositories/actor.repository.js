import Actor from "../models/actor.model.js";

export const findActorById = async (actorId)=>{
    return Actor.findById(actorId);
}

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

export const findActorByNameAndAge = async (name, age)=>{
    return Actor.findOne({name, age})
}