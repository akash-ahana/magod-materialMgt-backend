import {conn_mis} from "../db/conn.js"

export const getCustBomList = (req,res) => {
    conn_mis.query("SELECT * FROM cust_bomlist",(err,result)=>{
        if(err){
            res.send("Record Not Found :",err)
        }else{
            res.send(result)
        }
    })
}