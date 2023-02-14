import express from "express"
import { getCustBomList } from "../controllers/custBomList.js";

const router = express.Router()

router.get("/",getCustBomList);

export default router;