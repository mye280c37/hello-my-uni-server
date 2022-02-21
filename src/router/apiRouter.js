import express from 'express';
import routes from './routes';
import { getUpdateUni, getUniBoard, getConversion } from '../controller/apiController';
import { getReviewBoard, postReviewPost , getReviewRead, postReviewDelete } from '../controller/apiController';
import { postConsultingSave, getConsultingBoard, postConsultingRead, postConsultingUpdate } from '../controller/apiController';
import { postCommentUpdate, postCommentDelete } from '../controller/apiController';
import { postCheckAdmin1Code, postCheckAdmin2Code} from '../controller/apiController';
import { imageUpload } from '../controller/uploadImage';
import { getConsultingDate, postConsultingDateAdd } from '../controller/apiController';
import { postDescriptionCreate, getDescriptionList, postDescriptionRetrieve, postDescriptionUpdate} from '../controller/apiController';
import 'mongoose-function';

// '/api/'로 시작

const apiRouter = express.Router();

apiRouter.get(routes.each_converter, getConversion);
apiRouter.get(routes.uni_info_update, getUpdateUni);
apiRouter.get(routes.uni_board, getUniBoard);

apiRouter.get(routes.review_board, getReviewBoard);

apiRouter.post(routes.review_post, postReviewPost);

apiRouter.get(routes.review_read, getReviewRead);
apiRouter.post(routes.review_delete, postReviewDelete);

apiRouter.post(routes.consulting_create, postConsultingSave);
apiRouter.get(routes.consulting_board, getConsultingBoard);
apiRouter.post(routes.consulting_read, postConsultingRead);
apiRouter.post(routes.consulting_update, postConsultingUpdate);
apiRouter.post(routes.comment_update, postCommentUpdate);
apiRouter.post(routes.comment_delete, postCommentDelete);

apiRouter.post(routes.check_admin1, postCheckAdmin1Code);
apiRouter.post(routes.check_admin2, postCheckAdmin2Code);

apiRouter.post(routes.image_upload, imageUpload);

apiRouter.get(routes.consulting_date, getConsultingDate);
apiRouter.post(routes.consulting_date_add, postConsultingDateAdd);

apiRouter.post(routes.description_create, postDescriptionCreate);
apiRouter.get(routes.description_list, getDescriptionList);
apiRouter.post(routes.description_retrieve, postDescriptionRetrieve);
apiRouter.post(routes.description_update, postDescriptionUpdate);

export default apiRouter;
