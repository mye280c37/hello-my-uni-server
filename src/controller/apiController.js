import University from '../database/models/University';
import Video from '../database/models/Video';
import Review from '../database/models/Review';
import Consulting from '../database/models/Consulting';

import unis from './rawData/universities';

import dotenv from 'dotenv';
import fs from 'file-system';

// const MONGO_URI='mongodb://localhost/database';
dotenv.config();

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

export async function getUniBoard(req, res) {
    try {
        const result = await University.find({});
        const message = "Get UniversityBoard Success";
        return res.json({
            result,
            message
        });
    } catch (error){
        console.log(error);
        return res.json({
            message: "Get UniversityBoard Fail"
        });
    };
}

// http://127.0.0.1:5000/api/converter/each?korean=34&english=56&math=88&society=98&science=89&history=90&choice=97&status=0

export async function getConversion(req, res) {

    const score = str_to_int(req);

    console.log(score);
    
    let result = [];

	res.set("Access-Control-Allow-Origin", '*');
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

export async function postReviewDelete(req, res) {
    const {
        id,
        password
    } = req.body;

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");


    try {
        const review = await Review.findById({_id:id}, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
    
            return data;
        });
        if (review) {
            if(review.password === password){
                await Review.deleteOne({_id:id}, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            message: "fail",
                            error: "database"
                        });
                    }
    
                    return res.json({
                        message: "success"
                    });
                })
            } else {
                return res.json({
                    message: "fail",
                    error: "password"
                });
            }
            
        }
    } catch (err) {
        return res.json({
            message: "fail",
            error: "server"
        });
    }    
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

function changeConsultingDateInfo(date_time) {
    const monInd = date_time.indexOf('월');
    const dateInd = date_time.indexOf('일');
    const month = date_time.substring(0, monInd);
    const date = date_time.substring(monInd+2, dateInd);
    const time = date_time.substring(dateInd+2, date_time.length);

    const dataBuffer = fs.readFileSync('src/controller/rawData/consultingDate.json');
    const dataJSON = dataBuffer.toString();
    const consultingDate = JSON.parse(dataJSON);

    for(let i=0; i<consultingDate[month][date].length; i++){
        if(consultingDate[month][date][i] === time){
            consultingDate[month][date].splice(i, 1);
        }
    }

    fs.writeFileSync('src/controller/rawData/consultingDate.json', JSON.stringify(consultingDate, null, '\t'));

}

export async function postConsultingSave(req, res) {
    const {
        key,
        name, age, gender, phone,
        option,
        application,
        scores, // { 'korean', 'english', 'math', 'society', 'science', 'history', 'choice' }
        average, 
        application_reason, 
        hope, // {'uni', 'major'} 6개
        hope_reason,
        note, // 'yyyy-MM-dd HH:mm-HH:mm'
        check, account, comments
    } = req.body;

    console.log(req.body);

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    const newConsulting = new Consulting({ 
        key: key, 
        name: name, 
        age: age, 
        gender: gender, 
        phone: phone, 
        option: option, 
        application: application, 
        scores: scores, 
        average: average, 
        application_reason: application_reason, 
        hope: hope, 
        hope_reason: hope_reason,
        note: note, 
        check: check, 
        account: account,
        comments: {
            date: comments[0].date,
            contents: comments[0].contents
        }
     });

    newConsulting.save((err) => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                message: "fail: " + err
            });
        }else{
            changeConsultingDateInfo(comments[0].date);
        }
    });

    return res.status(200).json({
        message: "success"
    });
}

export async function getConsultingBoard(req, res) {
    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");
    
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

export async function postConsultingUpdate(req, res) {
    const {
        id, date, contents, commentId
    } = req.body;

    console.log(req.body);

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    let targetConsulting = await Consulting.findById({_id:id}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });
    if(targetConsulting !== null) {
        let targetComment = targetConsulting.comments.id(commentId);
        if( targetComment === null ) {
            const comment = {
                date: date,
                contents: contents
            };
            if(targetConsulting.comments){
                await Consulting.updateOne({ _id: id }, { $push: {comments: comment}});
            }else{
                await Consulting.updateOne({ _id: id }, { comments: [comment]});
            }
            return res.status(200).json({
                message: "success"
            });
        }else {
            targetComment.contents = contents;
            targetConsulting.save();
        }
        return res.status(200).json({
            message: "success"
        });   
    }else {
        return res.json({
            message: "fail",
            error: "no Object"
        });  
    }
}

export async function postCommentUpdate(req, res){
    const {
        id, commentId, contents
    } = req.body;

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    let targetConsulting = await Consulting.findById({_id:id}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });
    if (targetConsulting) {
        let targetComment = await targetConsulting.comments.id(commentId);
        if(targetComment){
            targetComment.contents = contents;
            targetConsulting.save();

            return res.status(200).json({
                message: "success"
            }); 
        }
        
    }
    return res.status(200).json({
        message: "fail"
    }); 
}

export async function postCommentDelete(req, res){
    const {
        id, commentId
    } = req.body;

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    let targetConsulting = await Consulting.findById({_id:id}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });
    if (targetConsulting) {
        if(targetConsulting.comments.length === 1){
            let targetComment = await targetConsulting.comments.id(commentId);
            if(targetComment){
                targetComment.contents = '';
                targetConsulting.save();

                return res.status(200).json({
                    message: "success"
                }); 
            }
        }else{
            try{
                await Consulting.updateOne({_id:id}, {$pull:{comments:{_id:commentId}}});
                return res.status(200).json({
                    message: "success"
                }); 
            }
            catch(err){
                console.log(err);
                return res.status(200).json({
                    message: "fail"
                }); 
            }
        }
    }
    return res.status(200).json({
        message: "fail"
    }); 
}

export async function getCheckAdmin1Code(req, res){
    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    if(req.query.key == process.env.ADMIN1){
        return res.json({
            message: "success"
        });
    }else{
        return res.json({
            message: "fail"
        });
    }

    // try {
    //     const result = await Manager.find({});
    //     const message = "success";

    //     return res.json({
    //         result,
    //         message
    //     });
    // }catch (error){
    //     console.log(error);
    //     return res.json({
    //         message: "fail"
    //     });
    // };
}


export async function getCheckAdmin2Code(req, res){
    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    if(req.query.key == process.env.ADMIN2){
        return res.json({
            message: "success"
        });
    }else{
        return res.json({
            message: "fail"
        });
    }
}

export async function getConsultingDate(req, res){
    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    const dataBuffer = fs.readFileSync('src/controller/rawData/consultingDate.json');
    const dataJSON = dataBuffer.toString();

    return res.json({
        result: JSON.parse(dataJSON)
    });
}

export async function postConsultingDateAdd(req, res){
    const {
        month, date, timeList
    } = req.body;

    const dataBuffer = fs.readFileSync('src/controller/rawData/consultingDate.json');
    const dataJSON = dataBuffer.toString();
    const consultingDate = JSON.parse(dataJSON);

    res.set("Access-Control-Allow-Origin", '*');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    consultingDate[month][date] = timeList;

    return res.status(200).json({
        message: "success"
    });
}