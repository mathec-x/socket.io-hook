"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoContext = exports.useSocket = exports.SocketIoProvider = void 0;
var provider_1 = __importDefault(require("./provider"));
exports.SocketIoProvider = provider_1.default;
var context_1 = require("./context");
Object.defineProperty(exports, "IoContext", { enumerable: true, get: function () { return context_1.IoContext; } });
Object.defineProperty(exports, "useSocket", { enumerable: true, get: function () { return context_1.useSocket; } });
