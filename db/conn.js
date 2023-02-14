import mysql from "mysql2"
import dotenv from 'dotenv';

dotenv.config()

//machine_data Database
export const conn_machine = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_MACHINE
});

conn_machine.connect((err)=>{
    if(err) throw err;
    console.log("DB Machine Connected");
})


//magod_mtrl Database
export const conn_mtlr = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_MTRL
});

conn_mtlr.connect((err)=>{
    if(err) throw err;
    console.log("DB Mtrl Connected");
})


//magod_production Database
export const conn_production = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_PRODUCTION
});

conn_production.connect((err)=>{
    if(err) throw err;
    console.log("DB Production Connected");
})


//magod_sales Database
export const conn_sales = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_SALES
});

conn_sales.connect((err)=>{
    if(err) throw err;
    console.log("DB Sales Connected");
})


//magodmis Database
export const conn_mis = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_MIS
});

conn_mis.connect((err)=>{
    if(err) throw err;
    console.log("DB MIS Connected");
})


//magodqtn Database
export const conn_qtn = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_QTN
});

conn_qtn.connect((err)=>{
    if(err) throw err;
    console.log("DB Qtn Connected");
})


//mtrlacct Database
export const conn_acct = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_ACCT
});

conn_acct.connect((err)=>{
    if(err) throw err;
    console.log("DB Acct Connected");
})
