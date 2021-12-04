import express from 'express';
import { getAccessToken, getUserInfo, loginUser, logoutUser, registerUser} from '../controllers/authController';
import { auth } from '../middlewares/auth';
const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getUserInfo').get(auth,getUserInfo);
router.route('/refresh_token').get(getAccessToken);

export default router;