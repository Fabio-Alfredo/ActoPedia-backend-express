import User from '../models/user.model';


export const createUser = async (user)=>{
    const newUser = new User(user)
    return newUser.save();
}

