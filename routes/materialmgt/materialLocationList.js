const materialLocationListRouter = require("express").Router();
const { setupQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

materialLocationListRouter.get(
  "/allMaterialLocationList",
  async (req, res, next) => {
    try {
      setupQueryMod(
        "Select * from magod_setup.material_location_list order by LocationNo asc",
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

module.exports = materialLocationListRouter;
