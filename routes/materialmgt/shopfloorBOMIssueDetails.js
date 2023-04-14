const shopfloorBOMIssueDetailsRouter = require("express").Router();
const { misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

shopfloorBOMIssueDetailsRouter.post(
  "/updateQtyReturnedShopfloorBOMIssueDetails",
  async (req, res, next) => {
    try {
      let { Id } = req.body;
      misQueryMod(
        `UPDATE magodmis.shopfloor_bom_issuedetails s SET s.QtyReturned=s.QtyIssued WHERE s.Id= ${Id}`,
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

module.exports = shopfloorBOMIssueDetailsRouter;
