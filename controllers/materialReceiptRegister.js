import {conn_mis} from "../db/conn.js"

export const getMaterialReceiptRegister = (req,res) => {
    let type1 = req.query.type1;
    let type2 = req.query.type2;
    conn_mis.query(`SELECT * FROM material_receipt_register where RVStatus = '${type1}' and Type = '${type2}' order by RV_Date DESC`,(err,result)=>{
        if(err){
            res.send("Record Not Found :",err)
        }else{
            res.send(result)
        }
    })
}

export const insertMaterialReceiptRegisterHeader = (req,res) => {
    const{receiptDate,rvNo,rvDate,status,customer,customerName,reference,weight,calcWeight} = req.body;
    const query = `insert into  material_receipt_register (ReceiptDate,RV_No,RV_Date,Cust_Code,Customer,CustDocuNo,RVStatus,TotalWeight,TotalCalculatedWeight) values ("${receiptDate}","${rvNo}","${rvDate}","${customer}","${customerName}","${reference}","${status}","${weight}","${calcWeight}")`;
    //console.log(query);
    //res.send(query);
    conn_mis.query(query,(err,result)=>{
        if(err){
            res.send("Record Not Inserted :",err)
        }else{
            res.send("Record Inserted Successfully")
        }
    })
}
