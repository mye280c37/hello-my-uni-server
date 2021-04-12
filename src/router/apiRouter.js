import express from 'express';
import routes from './routes';
import {getEduVideo, getConversion, getReviewBoard, postReviewPost , getReviewPost, postConsultingSave, getConsultingBoard, getUpdateUni} from '../controller/apiController';
import 'mongoose-function';

// '/api/'로 시작

const apiRouter = express.Router();

apiRouter.get(routes.each_converter, getConversion);
apiRouter.get(routes.uni_info_update, getUpdateUni);

apiRouter.get(routes.edu_video, getEduVideo);
apiRouter.get(routes.review_board, getReviewBoard);

apiRouter.post(routes.review_post, postReviewPost);

apiRouter.get(routes.review_read, getReviewPost);

apiRouter.post(routes.consulting_save, postConsultingSave);
apiRouter.get(routes.consulting_board, getConsultingBoard);

export default apiRouter;
