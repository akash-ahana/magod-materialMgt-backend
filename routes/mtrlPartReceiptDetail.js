import express from "express";
import { insertMtrlPartReceiptDetail } from "../controllers/mtrlPartReceiptDetail.js";

const router = express.Router();

//router.get("/", getMaterialReceiptRegister);
router.post("/insert", insertMtrlPartReceiptDetail);
//router.put("/updateHeader", updateMaterialReceiptRegisterHeader);

export default router;
