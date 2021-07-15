"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const app = express_1.default();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('piiiiiiiing');
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
