"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Library app initialized");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const db_1 = require("./db");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/books', routes_1.router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
