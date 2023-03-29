const mtrlPartIssueDetailsRouter = require("express").Router();
const { misQuery, setupQuery, misQueryMod } = require("../../helpers/dbconn");
const { logger } = require("../../helpers/logger");

mtrlPartIssueDetailsRouter.get(
  "/getmtrlPartIssueDetailsByIVID",
  async (req, res, next) => {
    let id = req.query.id;
    // console.log(
    //   `Select * from magodmis.mtrl_part_issue_details where Iv_Id = ${id}`
    // );
    try {
      await misQueryMod(
        `Select * from magodmis.mtrl_part_issue_details where Iv_Id = ${id}`,
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

module.exports = mtrlPartIssueDetailsRouter;
