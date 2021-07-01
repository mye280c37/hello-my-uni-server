import mongoose from 'mongoose';

const EssaySchema = new mongoose.Schema({
    univsersity: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    password: { type: String, required: true },
    complete: { type: Boolean, default: false },
});

const Essay = mongoose.model("Essay", EssaySchema);
export default Essay;
