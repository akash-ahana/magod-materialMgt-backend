const materialIssueRegisterRouter = require("express").Router();
const { misQuery, setupQuery, misQueryMod } = require("../../helpers/dbconn");
const { logger } = require("../../helpers/logger");

materialIssueRegisterRouter.post("/insert", async (req, res, next) => {
  try {
    let {
      IV_No,
      IV_Date,
      Cust_code,
      Customer,
      CustCSTNo,
      CustTINNo,
      CustECCNo,
      CustGSTNo,
      EMail,
      PkngDcNo,
      PkngDCDate,
      TotalWeight,
      TotalCalculatedWeight,
      UpDated,
      IVStatus,
      Dc_ID,
      Type,
    } = req.body;

    misQueryMod(
      `insert into  material_issue_register (IV_No,IV_Date, Cust_code, Customer, CustCSTNo, CustTINNo, CustECCNo, CustGSTNo, EMail, PkngDcNo, PkngDCDate, TotalWeight, TotalCalculatedWeight, UpDated, IVStatus, Dc_ID, Type) values ("${IV_No}","${IV_Date}","${Cust_code}","${Customer}","${CustCSTNo}","${CustTINNo}","${CustECCNo}","${CustGSTNo}","${EMail}","${PkngDcNo}",${PkngDCDate},"${TotalWeight}","${TotalCalculatedWeight}","${UpDated}","${IVStatus}","${Dc_ID}","${Type}")`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

materialIssueRegisterRouter.get(
  "/allPendingDispatchRouter",
  async (req, res, next) => {
    try {
      await misQueryMod(
        "Select IV_No,cust_code,IV_Date,Customer,TotalWeight,Type from magodmis.material_issue_register where cust_code not like 0000 order by IV_No desc limit 20 ",
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
materialIssueRegisterRouter.get(
  "/checkPendingDispatchRouter",
  async (req, res, next) => {
    try {
      let customer = req.query.customer;

      await misQueryMod(
        `Select IV_No,IV_Date,Customer,TotalWeight,Type from magodmis.material_issue_register where Customer= "${customer}" `,
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

materialIssueRegisterRouter.get("/customerIVlist", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where pkngdcno is null and ivstatus not like 'cancelled' order by IV_No desc limit 20 ",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
materialIssueRegisterRouter.get("/cancelledList", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where  ivstatus  like 'cancelled' order by IV_No desc limit 20 ",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
materialIssueRegisterRouter.get("/SalesIVList", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where cust_code not like 0000 order by IV_No desc limit 20 ",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
module.exports = materialIssueRegisterRouter;
