import { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        director:{
            type: String,
            required: true,
        },
        actors:[
            {
                actor:{ type: Schema.Types.ObjectId, ref: 'Actor' },
                personaje: String,
            }
        ],
        reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        image:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        year:{
            type: Number,
            required: true,
        },
        genero:{
            type: String,
            enum:[],
            required: true,
        },


    },
    {
        timestamps: true,
    }
)