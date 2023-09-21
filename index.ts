import express, { Express,Request,Response, urlencoded } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { app as payment } from "./routes/payment";
dotenv.config();

const app:Express = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use("/pay",payment);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});