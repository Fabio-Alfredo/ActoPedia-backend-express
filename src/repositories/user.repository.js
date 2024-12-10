import User from '../models/user.model.js';


export const createUser = async (user)=>{
    const newUser = new User(user)
    return newUser.save();
}

