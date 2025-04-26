"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// import bodyparser from "body-parser";
const cors_1 = __importDefault(require("cors"));
const webcall_1 = require("./webcall");
const method = new webcall_1.WEBCALL;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const allowedOrigins = ['*'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use("/output", express_1.default.static(__dirname + '/../output'));
const port = 8083;
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/../output/index.html'));
    console.log(method.checkUser(req, 'http://192.168.1.11:8083/', 'get'));
});
app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://192.168.1.11:${port}`);
});
