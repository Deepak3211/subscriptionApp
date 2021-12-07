import express from 'express';
import { createSubscription, getPrice} from '../controllers/subsController';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.route('/getPrice').get(getPrice);
router.route('/create-subscription').post(auth,createSubscription);

export default router;