const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { logger } = require("./helpers/logger");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

//customer
const customerRouter = require("./routes/materialmgt/customer");
app.use("/customers", customerRouter);

//cust bom list
const custBomListRouter = require("./routes/materialmgt/custBomList");
app.use("/custbomlist", custBomListRouter);

//material receipt voucher
const materialReceiptRegisterRouter = require("./routes/materialmgt/materialReceiptRegister");
app.use("/materialReceiptRegister", materialReceiptRegisterRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
  logger.error(`Status Code : ${err.status}  - Error : ${err.message}`);
});

// starting the server
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  logger.info("listening on port " + process.env.PORT);
});
