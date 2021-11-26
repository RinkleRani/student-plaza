const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "LoginDB"

})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))


app.listen(3001, () => {
    console.log("Running on port 3001");
})

app.get("/login",(req,res)=>{
    const sqlInsert = "INSERT INTO `LoginDB`.`users` (`userName`, `password`) VALUES ('panch', 'testpassword');"
    db.query(sqlInsert,(err,result)=>{
        res.send("hello aanch!");
    })

   
})

app.post('/register',(req,res)=>{
    const email = req.body.emailInp;
    const password = req.body.passwordInp;
    const fullName = req.body.fullNameInp;
    const phone = req.body.contactInp;

    const sqlInsert = "INSERT INTO `LoginDB`.`email` (`email`, `password`, `name`, `contact`) VALUES (?,?,?,?);"
    db.query(sqlInsert,[email,password,fullName,phone],(err,result)=>{
        console.log(result);

    });
})
