const mtrlStockListRouter = require("express").Router();
const { misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

mtrlStockListRouter.get("/checkStockAvailable", async (req, res, next) => {
  try {
    let rvno = req.query.rvno;
    // console.log(
    //   `Select * from magodmis.mtrlstocklist where RV_No =  "${rvno}"`
    // );
    misQueryMod(
      `Select * from magodmis.mtrlstocklist where RV_No =  "${rvno}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
    //res.send(false);
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/insertMtrlStockList", async (req, res, next) => {
  try {
    let {
      mtrlStockId,
      mtrlRvId,
      custCode,
      customer,
      rvNo,
      custDocuNo,
      mtrlCode,
      shape,
      shapeID,
      material,
      dynamicPara1,
      dynamicPara2,
      dynamicPara3,
      dynamicPara4,
      locked,
      scrap,
      issue,
      weight,
      scrapWeight,
      ivNo,
      ncProgramNo,
      locationNo,
      srl,
      qtyAccepted,
    } = req.body;

    let returnData = null;
    //find shape
    misQueryMod(
      `select * from shapes where ShapeID = ${shapeID}`,
      (err, data) => {
        if (err) logger.error(err);
        shape = data[0].Shape;
        for (let i = 0; i < qtyAccepted; i++) {
          mtrlStockId = rvNo + "/" + srl + "/" + (i + 1);
          misQueryMod(
            `insert into  mtrlstocklist (MtrlStockID,Mtrl_Rv_id,Cust_Code,Customer,RV_No,Cust_Docu_No,Mtrl_Code,Shape,Material,DynamicPara1,DynamicPara2,DynamicPara3,DynamicPara4,Locked,Scrap,Issue,Weight,ScrapWeight,IV_No,NCProgramNo,LocationNo) values ("${mtrlStockId}",${mtrlRvId},"${custCode}","${customer}","${rvNo}","${custDocuNo}","${mtrlCode}","${shape}","${material}",${dynamicPara1},${dynamicPara2},${dynamicPara3},${dynamicPara4},${locked},${scrap},${issue},${weight},${scrapWeight},"${ivNo}","${ncProgramNo}","${locationNo}")`,
            (err, data1) => {
              if (err) logger.error(err);
              //returnData = data1;
              //res.send(data);
            }
          );
        }
      }
    );
    //console.log("returnData = ", returnData);
    res.send({ affectedRows: 1 });
    /*console.log(
      `insert into  mtrlstocklist (MtrlStockID,Mtrl_Rv_id,Cust_Code,Customer,RV_No,Cust_Docu_No,Mtrl_Code,Shape,Material,DynamicPara1,DynamicPara2,DynamicPara3,DynamicPara4,Locked,Scrap,Issue,Weight,ScrapWeight,IV_No,NCProgramNo,LocationNo) values ("${mtrlStockId}",${mtrlRvId},"${custCode}","${customer}","${rvNo}","${custDocuNo}","${mtrlCode}","${shape}","${material}",${dynamicPara1},${dynamicPara2},${dynamicPara3},${dynamicPara4},${locked},${scrap},${issue},${weight},${scrapWeight},"${ivNo}","${ncProgramNo}","${locationNo}")`
    );*/
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/deleteMtrlStockByRVNo", async (req, res, next) => {
  try {
    let { rvNo } = req.body;
    misQueryMod(
      `delete from magodmis.mtrlstocklist where RV_No =  "${rvNo}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/deleteMtrlStockByIVNo", async (req, res, next) => {
  try {
    let { IV_No } = req.body;
    misQueryMod(
      `delete from magodmis.mtrlstocklist where IV_No =  "${IV_No}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/updateIssueIVNo", async (req, res, next) => {
  try {
    let { Issue, Iv_No, MtrlStockID } = req.body;
    // console.log(
    //   `update magodmis.mtrlstocklist set Issue="${Issue}", Iv_No = "${Iv_No}" where MtrlStockID =  "${MtrlStockID}"`
    // );
    misQueryMod(
      `update magodmis.mtrlstocklist set Issue="${Issue}", Iv_No = "${Iv_No}" where MtrlStockID =  "${MtrlStockID}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/updateIVNoNULL", async (req, res, next) => {
  try {
    let { IV_No } = req.body;

    misQueryMod(
      `update magodmis.mtrlstocklist set Iv_No= null where Iv_No = "${IV_No}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/updateMtrlStockLock", async (req, res, next) => {
  try {
    let { id } = req.body;
    misQueryMod(
      `UPDATE magodmis.mtrlstocklist SET Locked=1 WHERE MtrlStockID='${id}'`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.post("/insertByReturnDetails", async (req, res, next) => {
  try {
    let { Iv_Id, IV_No } = req.body;
    /*console.log(
      `INSERT INTO  mtrlstocklist(MtrlStockID, Mtrl_Rv_id, Cust_Code, Customer, RV_No, Cust_Docu_No, Mtrl_Code, Shape, Material, DynamicPara1,
      DynamicPara2, DynamicPara3, DynamicPara4, Locked, Scrap, Issue, Weight,ScrapWeight,  NCProgramNo, LocationNo) 
      SELECT MtrlStockID, Mtrl_Rv_id, Cust_Code, Customer, RV_No, Cust_Docu_No,Mtrl_Code, Shape, Material, DynamicPara1, DynamicPara2, DynamicPara3,
      DynamicPara4, Locked, Scrap, Issue, Weight, ScrapWeight,  NCProgramNo, LocationNo FROM materialreturneddetails WHERE IV_No = '${IV_No}'`
    );*/
    misQueryMod(
      `INSERT INTO  mtrlstocklist(MtrlStockID, Mtrl_Rv_id, Cust_Code, Customer, RV_No, Cust_Docu_No, Mtrl_Code, Shape, Material, DynamicPara1,
        DynamicPara2, DynamicPara3, DynamicPara4, Locked, Scrap, Issue, Weight,ScrapWeight,  NCProgramNo, LocationNo) 
        SELECT MtrlStockID, Mtrl_Rv_id, Cust_Code, Customer, RV_No, Cust_Docu_No,Mtrl_Code, Shape, Material, DynamicPara1, DynamicPara2, DynamicPara3,
        DynamicPara4, Locked, Scrap, Issue, Weight, ScrapWeight,  NCProgramNo, LocationNo FROM materialreturneddetails WHERE IV_No = '${IV_No}'`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

mtrlStockListRouter.get("/getCustomerDetails", async (req, res, next) => {
  try {
    await misQueryMod(
      "SELECT Customer,Cust_Code FROM magodmis.mtrlstocklist group by Customer,Cust_Code order by Cust_Code not like 0000 ",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = mtrlStockListRouter;
