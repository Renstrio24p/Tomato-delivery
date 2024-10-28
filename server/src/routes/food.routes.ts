import { Router } from "express";
import { addFood } from "../controllers/food/addFood.controller.mts";
import { convertToWebp, upload } from "../controllers/image/uploadImage.controller.ts";
import { listFood } from "../controllers/food/listFood.controller.mts";
import { removeFood } from "../controllers/food/removeFood.controller.mts";

const router = Router();

router.post('/add', upload.array('image'), convertToWebp, addFood)
router.get('/list', listFood)
router.delete('/remove', removeFood)

export const foodRouter = router;
