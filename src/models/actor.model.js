import { Schema, model } from "mongoose";

const actorSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        age:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        biography:{
            type: String,
            required: true,
        },
        movies:[
            {
                movie:{ type: Schema.Types.ObjectId, ref: 'Movie' },
                personaje: String,
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Actor = model('Actor', actorSchema);

export default Actor;