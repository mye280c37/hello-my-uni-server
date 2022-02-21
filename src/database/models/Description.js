import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    time: String,
});

const Description = mongoose.model("Description", DescriptionSchema);
export default Description;
