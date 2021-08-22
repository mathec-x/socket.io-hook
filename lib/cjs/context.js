"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = exports.IoContext = void 0;
var react_1 = __importDefault(require("react"));
exports.IoContext = react_1.default.createContext(IoSocketInstance || null);
var useSocket = function () { return react_1.default.useContext(exports.IoContext); };
exports.useSocket = useSocket;
