import { Schema, model } from "mongoose";
import { MOVIE_GENERS } from "../utils/constans/moviegender.util.js";

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
                actor:{ type: Schema.Types.ObjectId, ref: 'Actor', inmutable: true },
                personaje: {String, inmutable:true},
            }
        ],
        reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
                inmutable: true,
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
            user:{type:Schema.Types.ObjectId, ref:"User", inmutable:true},
            date:{Date, inmutable:true},
        },
        updateFor:[
            {
                user:{type:Schema.Types.ObjectId, ref:"User", inmutable:true},
                date:{Date, inmutable:true},
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Movie = model('Movie', movieSchema);

export default Movie;