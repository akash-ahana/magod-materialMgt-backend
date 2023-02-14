import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import './db/conn.js';
import customer from './routes/customer.js';
import custBomList from './routes/custBomList.js';
import materialReceiptRegister from './routes/materialReceiptRegister.js';

/* Configuration */
dotenv.config()
const app = express() 
const port = 5000

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use("/api/customer",customer);
app.use("/api/custBomList",custBomList);
app.use("/api/materialReceiptRegister",materialReceiptRegister);

app.get("/",(req,res)=>res.send("Hello Express"));
app.all("*",(req,res)=>res.send("Routes doesn't Exists"));

app.listen(port,()=>console.log(`Server is listiening on port : ${port}`));

