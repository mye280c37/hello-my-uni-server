import mongoose from 'mongoose';

const ConsultingSchema = new mongoose.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String }, // 'm' or 'w'
    phone: {type: String, required: true},
    scores: {
      korean: Number,
      english: Number,
      math: Number,
      society: Number,
      science: Number,
      history: Number,
      choice: Number
    },
    average: { type: Number, required: true },
    option: { type: String, required:true }, // '/' 으로 항목 연결
    application: { type: String, required: true }, // '/' 으로 항목 연결
    application_reason: { type: String, required: true },
    hope: {
      '1': { uni: String, major: String },
      '2': { uni: String, major: String },
      '3': { uni: String, major: String },
      '4': { uni: String, major: String },
      '5': { uni: String, major: String },
      '6': { uni: String, major: String }
    },
    hope_reason: { type: String, default: ''},
    note: { type: String, default: ''}, 
    check: { type: Number, required: true }, // 1
    exam2SubjectName: { type: String, default: ''}, 
    examMon6Result: { type: String, default: ''}, 
    fileSendCheck: { type: Boolean, default: false },
    route: {type: String, default: ''},
    account: { type: String, required: true },
    comments:{ type: [{
        date: String, // yyyy-MM-dd HH:mm-HH:mm
        contents: String
    }], default: [] }
});

const Consulting = mongoose.model("Consulting", ConsultingSchema);

export default Consulting