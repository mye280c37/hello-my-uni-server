import University from '../database/models/University';
import Video from '../database/models/Video';
import Review from '../database/models/Review';
import Consulting from '../database/models/Consulting';

import unis from './converter/universities';

// 국 영 수 사회 과학 역사 선택
function str_to_int(req) {
     const {
        status, korean, english, math, society, science, history, choice
    } = req.query;
    let st = parseInt(status, 10);
    let k = parseInt(korean, 10);
    let e = parseInt(english, 10);
    let m = parseInt(math, 10);
    let s = parseInt(society, 10);
    let sc = parseInt(science, 10);
    let h = parseInt(history, 10);
    let c = parseInt(choice, 10);

    return {
        st, k,e,m,s,sc,h,c
    };
}

export async function getEduVideo (req, res) {
    const result = await Video.find({});
    return res.json({
        result,
        // message
    });
};

export async function getUpdateUni(req, res) {
    for (var i in unis) {
        var uni = unis[i];

        var uni_query = await University.find({ university: uni.university });

        if (uni_query.length === 0){
            uni_query = new University({ 
                university: uni.university, 
                area: uni.area, 
                type : uni.type, 
                weight: uni.weight, 
                standard: uni.standard, 
                result: uni.result, 
                func: uni.func, 
                link: uni.link });
            uni_query.save()
                .catch(err => {
                    return res.status(200).json({
                        message: "fail: " + err
                    });
                })
        }else{
            University.findOneAndUpdate({ university: uni.university }, { $set: {
                weight : uni.weight,
                result: uni.result,
                func: uni.func,
                link: uni.link,
            }});
        }
    }

    try {
        const result = await University.find({});
        const message = "success";
        return res.json({
            result,
            message
        });
    } catch (error){
        console.log(error);
        return res.json({
            message: "fail"
        });
    };
}

// http://127.0.0.1:5000/api/converter/each?korean=34&english=56&math=88&society=98&science=89&history=90&choice=97&status=0

export async function getConversion(req, res) {

    const score = str_to_int(req);

    console.log(score);
    
    let result = [];

	res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    result.push(await University.typeZero(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    result.push(await University.typeOne(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    result.push(await University.typeTwo(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    result.push(await University.typeThree(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    result.push(await University.typeFour(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    result.push(await University.typeFive(score.k, score.e, score.h, score.m, score.s, score.sc, score.c));
    return res.json({
        result
    });
};

export async function getReviewBoard(req, res) {
    try {
        const result = await Review.find({});
        const message = "Get ReviewBoard Success";
        return res.json({
            result,
            message
        });
    } catch (error){
        console.log(error);
        return res.json({
            message: "Get ReviewBoard Fail"
        });
    };
}

export async function postReviewPost(req, res) {
    const {
        title, body, author, password, time
    } = req.body;

    const newPost = new Review({ title, body, author, password, time });
    newPost.save((err) => {
        if (err) {
            console.log(err);
        }
    });

    return res.json({
	    message: "Review save Successfully"
    });
}


export async function getReviewRead(req, res) {
    const {
        id
    } = req.query;
    const text = await Review.findById({_id:id}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });

    return res.json(text);
}


/*
{
    name: '이름',
    age: 17,
    gender: 'm',
    option: '0',
    application: '0',
    description: '',
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

export async function postConsultingSave(req, res) {
    const {
        key,
        name, age, gender, 
        option,
        application, description,
        scores, // { 'korean', 'english', 'math', 'society', 'science', 'history', 'choice' }
        average, 
        application_reason, 
        hope, // {'uni', 'major'} 6개
        note, date_time, // date_time: 'yyyy-MM-dd HH:mm-HH:mm'
        check, account
    } = req.body;

    console.log(req.body);

    const newConsulting = new Consulting({ key, name, age, gender, option, application, description, scores, average, application_reason, hope, note, date_time, check, account });
    newConsulting.save((err) => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                message: "fail: " + err
            });
        }
    });

    return res.status(200).json({
        message: "success"
    });
}

export async function getConsultingBoard(req, res) {
    try {
        const result = await Consulting.find({});
        const message = "success";
        return res.json({
            result,
            message
        });
    } catch (error){
        console.log(error);
        return res.json({
            message: "fail"
        });
    };
}