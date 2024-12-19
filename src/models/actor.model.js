import { Schema, model } from "mongoose";

const actorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    movies: [
      {
        movie: { type: Schema.Types.ObjectId, ref: "Movie", inmutable: true },
        personaje:{String, inmutable:true} ,
      },
    ],
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
);

const Actor = model("Actor", actorSchema);

export default Actor;
