import express from 'express';
import routes from './routes';
import {getEduVideo, getConversion, getReviewBoard, postReviewPost , getReviewRead, postConsultingSave, getConsultingBoard, postConsultingUpdate, getUpdateUni, getCheckAdmin1Code, getCheckAdmin2Code} from '../controller/apiController';
import 'mongoose-function';

// '/api/'로 시작

const apiRouter = express.Router();

apiRouter.get(routes.each_converter, getConversion);
apiRouter.get(routes.uni_info_update, getUpdateUni);

apiRouter.get(routes.edu_video, getEduVideo);
apiRouter.get(routes.review_board, getReviewBoard);

apiRouter.post(routes.review_post, postReviewPost);

apiRouter.get(routes.review_read, getReviewRead);

apiRouter.post(routes.consulting_create, postConsultingSave);
apiRouter.get(routes.consulting_board, getConsultingBoard);
apiRouter.post(routes.consulting_update, postConsultingUpdate);

apiRouter.get(routes.check_admin1, getCheckAdmin1Code);
apiRouter.get(routes.check_admin2, getCheckAdmin2Code);

export default apiRouter;
