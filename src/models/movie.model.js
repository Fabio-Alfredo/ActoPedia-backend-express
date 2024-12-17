import { Schema, model } from "mongoose";
import { MOVIE_GENERS } from "../utils/moviegender.util.js";

const GENRES_LIST = Object.values(MOVIE_GENERS);

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
            enum: GENRES_LIST,
            default: MOVIE_GENERS.OTRO,
            required: true,
        },
        createFor:{
            user:{type:Schema.Types.ObjectId, ref:"User"},
            date:Date,
        },
        updateFor:[
            {
                user:{type:Schema.Types.ObjectId, ref:"User"},
                date:Date,
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Movie = model('Movie', movieSchema);

export default Movie;