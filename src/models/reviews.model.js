import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        content:{
            type: String,
            required: true,
        },
        qualification:{
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true,
        },
        movie:{
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true,
            immutable: true,
        },

    },
    {
        timestamps: true,
    }
);

const Review = model('Review', reviewSchema);

export default Review;