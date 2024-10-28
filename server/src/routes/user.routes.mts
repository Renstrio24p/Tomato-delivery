import { Router } from "express";
import { registerUser } from "../controllers/users/registerUser.controller.mts";
import { loginUser } from "../controllers/users/loginUser.controller.mts";
import { convertToWebp, uploadUser } from '../controllers/image/uploadImage.controller.ts';
import { getUserInfo } from "../controllers/users/getUserInfo.controller.mts";

const router = Router();

router.post('/register', uploadUser.single('image'), convertToWebp, registerUser);
router.post('/login', loginUser)
router.get('/profile', getUserInfo)

export const userRouter = router