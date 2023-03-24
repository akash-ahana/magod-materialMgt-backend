const mtrlIssueDetailsRouter = require("express").Router();
const { misQuery, setupQuery, misQueryMod } = require("../../helpers/dbconn");
const { logger } = require("../../helpers/logger");

mtrlIssueDetailsRouter.post("/insert", async (req, res, next) => {
  try {
    let {
      Iv_Id,
      Srl,
      IV_Date,
      IV_No,
      Cust_Code,
      Customer,
      MtrlDescription,
      Mtrl_Code,
      Material,
      PkngDCNo,
      cust_docu_No,
      RV_No,
      RV_Srl,
      Qty,
      TotalWeightCalculated,
      TotalWeight,
      UpDated,
      RvId,
      Mtrl_Rv_id,
    } = req.body;
    // console.log(
    //   `insert into  mtrlissuedetails (Iv_Id, Srl, IV_Date, IV_No, Cust_Code, Customer, MtrlDescription, Mtrl_Code, Material, PkngDCNo, cust_docu_No, RV_No, RV_Srl, Qty, TotalWeightCalculated, TotalWeight, UpDated, RvId, Mtrl_Rv_id) values ("${Iv_Id}","${Srl}",${IV_Date},"${IV_No}","${Cust_Code}","${Customer}","${MtrlDescription}","${Mtrl_Code}","${Material}","${PkngDCNo}","${cust_docu_No}","${RV_No}","${RV_Srl}","${Qty}","${TotalWeightCalculated}","${TotalWeight}","${UpDated}","${RvId}","${Mtrl_Rv_id}")`
    // );
    await misQueryMod(
      `insert into  mtrlissuedetails (Iv_Id, Srl, IV_Date, IV_No, Cust_Code, Customer, MtrlDescription, Mtrl_Code, Material, PkngDCNo, cust_docu_No, RV_No, RV_Srl, Qty, TotalWeightCalculated, TotalWeight, UpDated, RvId, Mtrl_Rv_id) values ("${Iv_Id}","${Srl}",${IV_Date},"${IV_No}","${Cust_Code}","${Customer}","${MtrlDescription}","${Mtrl_Code}","${Material}","${PkngDCNo}","${cust_docu_No}","${RV_No}","${RV_Srl}","${Qty}","${TotalWeightCalculated}","${TotalWeight}","${UpDated}","${RvId}","${Mtrl_Rv_id}")`,
      (err, data) => {
        if (err) {
          logger.error(err);
          res.send(err);
        }
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlIssueDetailsRouter.get(
  "/allmtrlIssueDetailsRouter",
  async (req, res, next) => {
    try {
      await misQueryMod(
        "Select Srl,MtrlDescription,Material,Qty,TotalWeightCalculated,TotalWeight from magodmis.`mtrlissuedetails` where cust_code not like 0000 order by IV_Id desc limit 20",
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

mtrlIssueDetailsRouter.post(
  "/updatemtrlIssueDetailsRouter",
  async (req, res, next) => {
    try {
      let { IvId, PkngDcNo, TotalWeight } = req.body;

      await misQueryMod(
        `update magodmis.material_issue_register set PkngDcNo="${PkngDcNo}",TotalWeight="${TotalWeight}" where Iv_No="${IvId}"`,
        (err, data) => {
          if (err) {
            logger.error(err);
            res.send(err);
          }
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);
module.exports = mtrlIssueDetailsRouter;
