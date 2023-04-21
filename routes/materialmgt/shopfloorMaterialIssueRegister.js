const shopfloorMaterialIssueRegisterRouter = require("express").Router();
const { misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

shopfloorMaterialIssueRegisterRouter.post(
  "/insertShopfloorMaterialIssueRegister",
  async (req, res, next) => {
    try {
      let { IV_No, Issue_date, NC_ProgramNo, QtyIssued, QtyReturned, Ncid } =
        req.body;
      misQueryMod(
        `INSERT INTO magodmis.\`shopfloor_material _issueregister\`
                (IV_No, Issue_date, NC_ProgramNo, QtyIssued,QtyReturned,Ncid) Values
                (${IV_No}, "${Issue_date}", ${NC_ProgramNo}, ${QtyIssued},${QtyReturned},${Ncid})`,
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

module.exports = shopfloorMaterialIssueRegisterRouter;
