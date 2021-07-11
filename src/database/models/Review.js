import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    password: String,
    time: String,
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
