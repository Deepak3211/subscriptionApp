import express from 'express';
import { getPrice} from '../controllers/subsController.js';
const router = express.Router();

router.route('/getPrice').get(getPrice);

export default router;