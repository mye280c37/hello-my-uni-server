import mongoose from 'mongoose';

const ConsultingDateSchema = new mongoose.Schema({
    month: { type: String, required: true },
    date: {type: String},
    timeList: {type: [String], default: []}
});

const ConsultingDate = mongoose.model("ConsultingDate", ConsultingDateSchema);
export default ConsultingDate;
