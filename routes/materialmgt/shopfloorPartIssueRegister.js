const shopfloorPartIssueRegisterRouter = require("express").Router();
const { misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

shopfloorPartIssueRegisterRouter.post(
  "/updateStatusShopfloorPartIssueRegister",
  async (req, res, next) => {
    try {
      let { Id, status } = req.body;
      misQueryMod(
        `UPDATE magodmis.\`shopfloor_part _issueregister\` s SET s.Status='${status}' WHERE s.IssueID= ${Id}`,
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

module.exports = shopfloorPartIssueRegisterRouter;
