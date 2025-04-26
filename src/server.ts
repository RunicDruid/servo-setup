import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
// import bodyparser from "body-parser";
import cors from 'cors';
import { WEBCALL } from "./webcall";
const method = new WEBCALL;
dotenv.config();
const app: Express = express();
app.use(cors());
const allowedOrigins = ['*'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());

app.use("/output", express.static(__dirname + '/../output'));
const port = 8083;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../output/index.html'));
  console.log(method.checkUser(req, 'http://192.168.1.11:8083/', 'get'));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://192.168.1.11:${port}`);
});

