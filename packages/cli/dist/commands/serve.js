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
exports.serveCommand = void 0;
const commander_1 = require("commander");
const local_api_1 = require("@js-scrapbook/local-api");
const node_path_1 = __importDefault(require("node:path"));
const isDevelopment = process.env.NODE_ENV === 'development';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Launch server with local file')
    .option('-p, --port <number>', 'server port', '3333')
    .action((filename = 'notebook.json', options) => __awaiter(void 0, void 0, void 0, function* () {
    const isLocalApiError = (err) => {
        return typeof err.code === 'string';
    };
    try {
        const baseFilename = node_path_1.default.basename(filename);
        const dir = node_path_1.default.join(process.cwd(), node_path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(parseInt(options.port), baseFilename, dir, isDevelopment);
        console.log(`Opened ${filename}. Open http://localhost:${options.port} to edit.`);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === 'EADDRINUSE') {
                console.error('Port is in use. Try running on a different port.');
            }
        }
        else if (err instanceof Error) {
            console.log('Heres the problem', err.message);
        }
        process.exit(1);
    }
}));
