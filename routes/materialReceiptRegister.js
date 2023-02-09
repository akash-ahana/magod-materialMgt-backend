import express from "express"
import { getMaterialReceiptRegister,insertMaterialReceiptRegisterHeader } from "../controllers/materialReceiptRegister.js"; 


const router = express.Router()

router.get("/",getMaterialReceiptRegister);
router.post("/insertHeader",insertMaterialReceiptRegisterHeader);

export default router;