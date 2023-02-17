const materialReceiptRegisterRouter = require("express").Router();
var createError = require("http-errors");
const { createFolder, copyallfiles } = require("../../helpers/folderhelper");
const { misQuery, setupQuery, misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { sendDueList } = require("../../helpers/sendmail");
const { logger } = require("../../helpers/logger");

materialReceiptRegisterRouter.get(
  "/getByTypeMaterialReceiptRegister",
  async (req, res, next) => {
    try {
      let type1 = req.query.type1;
      let type2 = req.query.type2;
      misQueryMod(
        `SELECT * FROM material_receipt_register where RVStatus = '${type1}' and Type = '${type2}' order by RV_Date DESC`,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialReceiptRegisterRouter.post(
  "/insertHeaderMaterialReceiptRegister",
  async (req, res, next) => {
    try {
      let {
        receiptDate,
        rvNo,
        rvDate,
        status,
        customer,
        customerName,
        reference,
        weight,
        calcWeight,
        type,
      } = req.body;
      //convert date dd/mm/yyyy to yyyy-mm-dd
      receiptDate = receiptDate.split("/").reverse().join("-");
      rvDate = receiptDate.split("/").reverse().join("-");
      misQueryMod(
        `insert into  material_receipt_register (ReceiptDate,RV_No,RV_Date,Cust_Code,Customer,CustDocuNo,RVStatus,TotalWeight,TotalCalculatedWeight,Type) values ("${receiptDate}","${rvNo}","${rvDate}","${customer}","${customerName}","${reference}","${status}","${weight}","${calcWeight}","${type}")`,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialReceiptRegisterRouter.post(
  "/updateHeaderMaterialReceiptRegister",
  async (req, res, next) => {
    try {
      let {
        receiptDate,
        rvNo,
        rvDate,
        status,
        customer,
        customerName,
        reference,
        weight,
        calcWeight,
        type,
      } = req.body;
      //convert date dd/mm/yyyy to yyyy-mm-dd
      receiptDate = receiptDate.split("/").reverse().join("-");
      rvDate = receiptDate.split("/").reverse().join("-");
      misQueryMod(
        `update material_receipt_register set ReceiptDate = "${receiptDate}",RV_No="${rvNo}",RV_Date="${rvDate}",Cust_Code="${customer}",Customer="${customerName}",CustDocuNo="${reference}",RVStatus="${status}",TotalWeight="${weight}",TotalCalculatedWeight="${calcWeight}" where  RvID = ${rvId}`,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = materialReceiptRegisterRouter;
