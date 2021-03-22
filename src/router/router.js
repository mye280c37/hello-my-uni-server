import express from 'express'   

const HOME = "/";

const CONVERTER = "/converter";

const REVIEW_READ = "/review_read";
const REVIEW_BOARD = "/review_board";
const REVIEW_POST = "/review_post";

const routes = express.Router();

routes.get('/', function(req, rest){
    rest.send('Hi, home');
})

export default routes