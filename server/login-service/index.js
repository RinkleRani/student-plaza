const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mysql = require("mysql");
const { response } = require('express');
require('custom-env').env();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "StudentPlazaUserDb"

})

app.use(cors());

app.use(express.json());
//app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     }
// }))


app.listen(3001, () => {
    console.log("Running on port 3001");
    const sqlTable = "CREATE TABLE IF NOT EXISTS `StudentPlazaUserDb`.`users` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(45) NULL,`password` VARCHAR(45) NULL,`name` VARCHAR(45) NULL,`contact` VARCHAR(45) NULL,PRIMARY KEY (`id`));";
    db.query(sqlTable,(err,result)=>{
        console.log("Error from create table: ",err);
        console.log("Result from create table: ",result);
    })
})



app.post('/register',(req,res)=>{
    const email = req.body.emailInp;
    const password = req.body.passwordInp;
    const fullName = req.body.fullNameInp;
    const phone = req.body.contactInp;

    console.log("email from /register: ",email);
    console.log("password from /register: ",password);
    console.log("fullName from /register: ",fullName);
    console.log("phone from /register: ",phone);


    
    const sqlInsert = "INSERT INTO `StudentPlazaUserDb`.`users` (`email`, `password`, `name`, `contact`) VALUES (?,?,?,?);"
    db.query(sqlInsert,[email,password,fullName,phone],(err,result)=>{
        console.log("Error from Table Insert: ",err);
        console.log("Result from Table Insert: ",result);

    });
})


app.post('/login',(req,res)=>{

    const email = req.body.emailInp ;
    const password = req.body.passwordInp ;
    console.log("Email from /login: ",email);
    console.log("Password from /login: ",password)


    const sqlInsert = "SELECT * FROM `StudentPlazaUserDb`.`users` WHERE email = ? AND password = ?;"
    db.query(sqlInsert,[email,password],(err,result)=>{
        if(err) {
            console.log("Error from /Login: ",err);
            res.send({err: err});}

        if(result.length>0){
               // req.session.user = result;
              //  console.log(req.session.user);
                res.send(result);
                console.log("Result from /login: ",result);
            }
        else{
                console.log("Result from /login: ",result);
                res.send({message:"Invalid email / password!"})
            }        
    });
})


// app.get('/login', (req, res)=>{
//     if(req.session.user){
//         res.send({loggedIn: true, user: req.session.user})
//     }else{
//         res.send({loggedIn: false})
//     }
// })



