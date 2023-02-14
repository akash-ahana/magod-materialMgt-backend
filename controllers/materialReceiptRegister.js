import { conn_mis } from "../db/conn.js";

export const getMaterialReceiptRegister = (req, res) => {
  let type1 = req.query.type1;
  let type2 = req.query.type2;
  conn_mis.query(
    `SELECT * FROM material_receipt_register where RVStatus = '${type1}' and Type = '${type2}' order by RV_Date DESC`,
    (err, result) => {
      if (err) {
        res.send("Record Not Found :", err);
      } else {
        res.send(result);
      }
    }
  );
};

export const insertMaterialReceiptRegisterHeader = (req, res) => {
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
  const query = `insert into  material_receipt_register (ReceiptDate,RV_No,RV_Date,Cust_Code,Customer,CustDocuNo,RVStatus,TotalWeight,TotalCalculatedWeight,Type) values ("${receiptDate}","${rvNo}","${rvDate}","${customer}","${customerName}","${reference}","${status}","${weight}","${calcWeight}","${type}")`;
  //console.log(query);
  //res.send(query);
  conn_mis.query(query, (err, result) => {
    if (err) {
      res.send("Record Not Inserted :", err);
    } else {
      //console.log("Result = ", result);
      //res.send("Record Inserted Successfully");
      res.send(result);
    }
  });
};

export const updateMaterialReceiptRegisterHeader = (req, res) => {
  let {
    rvId,
    receiptDate,
    rvNo,
    rvDate,
    status,
    customer,
    customerName,
    reference,
    weight,
    calcWeight,
  } = req.body;
  //convert date dd/mm/yyyy to yyyy-mm-dd
  receiptDate = receiptDate.split("/").reverse().join("-");
  rvDate = receiptDate.split("/").reverse().join("-");
  const query = `update material_receipt_register set ReceiptDate = "${receiptDate}",RV_No="${rvNo}",RV_Date="${rvDate}",Cust_Code="${customer}",Customer="${customerName}",CustDocuNo="${reference}",RVStatus="${status}",TotalWeight="${weight}",TotalCalculatedWeight="${calcWeight}" where  RvID = ${rvId}`;
  console.log(query);
  //res.send(query);
  conn_mis.query(query, (err, result) => {
    if (err) {
      res.send("Record Not Updated :", err);
    } else {
      //console.log("Result = ", result);
      res.send(result);
    }
  });
};
