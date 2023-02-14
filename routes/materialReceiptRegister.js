import express from "express";
import {
  getMaterialReceiptRegister,
  insertMaterialReceiptRegisterHeader,
  updateMaterialReceiptRegisterHeader,
} from "../controllers/materialReceiptRegister.js";

const router = express.Router();

router.get("/", getMaterialReceiptRegister);
router.post("/insertHeader", insertMaterialReceiptRegisterHeader);
router.put("/updateHeader", updateMaterialReceiptRegisterHeader);

export default router;
