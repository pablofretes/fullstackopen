"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getDataPatientNoSsn());
});
router.post('/', (req, res) => {
    const newPatientEntry = patientsService_1.default.addEntryPatient(req.body);
    res.json(newPatientEntry);
});
exports.default = router;
