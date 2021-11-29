import express from "express";
import bodyParser = require('body-parser')
import cors = require('cors')
import V0Router from "./api/v0/v0Router";

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.json());

const hostname = '0.0.0.0'
const port = 3000

app.get("/", (req, res) => {
    res.statusCode  = 200
    res.setHeader('content-Type', 'text/plain')
    res.end('Hello-World\n')    
    req.on('error', (err) => {
        console.error(err);
    });
})

app.use("/api/v0", V0Router)  

app.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
})
