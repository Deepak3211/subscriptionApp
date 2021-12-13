import express from 'express';
import { createSubscription, customerPortal, getPrice, getSubscriptions, getSubscriptionStatus} from '../controllers/subsController';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.route('/getPrice').get(getPrice);
router.route('/create-subscription').post(auth,createSubscription);
router.route('/subscription-status').get(auth,getSubscriptionStatus);
router.route('/subscriptions').get(auth,getSubscriptions);
router.route('/customer-portal').get(auth,customerPortal);

export default router;