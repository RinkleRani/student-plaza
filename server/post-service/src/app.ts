import express from "express";
import { PostRouter } from "./routes/postRouter";

const app = express();

const hostname = '0.0.0.0'
const port = 3000

app.get("/", (req, res) => {
    res.statusCode  = 200
    res.setHeader('content-Type', 'text/plain')
    res.end('Hello-World\n')
})

app.use("/post", PostRouter)

app.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
})
