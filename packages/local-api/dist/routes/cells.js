"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellRouter = void 0;
const express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(bodyParser.json());
    const filePath = path_1.default.join(dir, filename);
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let cellData = '';
        const isLocalApiError = (err) => {
            return typeof err.code === 'string';
        };
        try {
            cellData = yield promises_1.default.readFile(filePath, { encoding: 'utf8' });
            res.status(200).send(JSON.parse(cellData));
        }
        catch (err) {
            if (isLocalApiError(err)) {
                if (err.code === 'ENOENT') {
                    yield promises_1.default.writeFile(filePath, '[]', 'utf8');
                    res.status(200).json([]);
                }
                else {
                    throw err;
                }
            }
        }
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let cellData = yield req.body.data;
            promises_1.default.writeFile(filePath, JSON.stringify(cellData));
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }));
    return router;
};
exports.createCellRouter = createCellRouter;
