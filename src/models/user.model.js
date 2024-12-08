import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

export default User;