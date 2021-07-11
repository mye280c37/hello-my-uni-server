import mongoose from 'mongoose';

/*
{
    name: '이름',
    age: 17,
    gender: 'm',
    scores: {
      korean: 34,
      english: 56,
      math: 87,
      society: 77,
      science: 89,
      history: 100,
      choice: 94
    },
    average: 86,
    application: '0',
    application_reason: '어쩌구 저쩌구',
    hope: {
      '1': { uni: '대학1', major: '전공1' },
      '2': { uni: '대학2', major: '전공2' },
      '3': { uni: '대학3', major: '전공3' },
      '4': { uni: '대학4', major: '전공4' },
      '5': { uni: '대학5', major: '전공5' },
      '6': { uni: '대학6', major: '전공6' }
    },
    note: '',
    date_time: '2021-03-28 14:30-15:30',
    check: 1,
    account: '1002-857-980326 우리은행 강예은'
  }
*/

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
    account: { type: String, required: true },
    comments:{ type: [{
        date: String, // yyyy-MM-dd HH:mm-HH:mm
        contents: String
    }], default: [] }
});

const Consulting = mongoose.model("Consulting", ConsultingSchema);

export default Consulting