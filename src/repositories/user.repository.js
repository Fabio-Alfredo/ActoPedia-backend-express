import User from '../models/user.model.js';


export const createUser = async (user)=>{
    const newUser = new User(user)
    return newUser.save();
}

export const getUserByEmail = async (email)=>{
    return User.findOne({email});
}

export const getUserByUsername = async (username)=>{
    return User.findOne({username});
}