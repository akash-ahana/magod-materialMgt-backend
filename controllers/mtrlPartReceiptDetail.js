export const insertMtrlPartReceiptDetail = (req, res) => {
  const {
    rvId,
    custBomId,
    unitWt,
    qtyReceived,
    qtyRejected,
    qtyUsed,
    qtyReturned,
    partId,
    qtyAccepted,
    qtyIssued,
  } = req.body;
  const query = `insert into  mtrl_part_receipt_details (RVID,CustBOM_Id,UnitWt,QtyReceived,QtyRejected,QtyReturned,PartId,QtyAccepted,QtyIssued) values ("${rvId}","${custBomId}","${unitWt}","${qtyReceived}","${qtyRejected}","${qtyUsed}","${qtyReturned}","${partId}","${qtyAccepted}","${qtyIssued}")`;
  //console.log(query);
  //res.send(query);
  conn_mis.query(query, (err, result) => {
    if (err) {
      res.send("Record Not Inserted :", err);
    } else {
      res.send(result);
    }
  });
};

export const deleteMtrlPartReceiptDetail = (req, res) => {
  const { id } = req.body;
  const query = `delete from mtrl_part_receipt_details where id = "${id}"`;
  //console.log(query);
  //res.send(query);
  conn_mis.query(query, (err, result) => {
    if (err) {
      res.send("Record Not Deleted :", err);
    } else {
      res.send("Record Deleted Successfully");
    }
  });
};
