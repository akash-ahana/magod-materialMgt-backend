import {conn_mis} from "../db/conn.js"

export const getCustomers = (req,res) => {
    conn_mis.query("SELECT * FROM cust_data",(err,result)=>{
        if(err){
            res.send("Record Not Found :",err)
        }else{
            res.send(result)
        }
    })
}