"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var context_1 = require("./context");
var useSocket = function (props) {
    var _a = react_1.default.useState(null), socket = _a[0], setSocket = _a[1];
    react_1.default.useEffect(function () {
        if (typeof window !== "undefined") {
            setSocket(socket_io_client_1.default(props.url || "", props.options));
        }
        return function () {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
    return socket;
};
var SocketIoProvider = function (_a) {
    var onDisconnect = _a.onDisconnect, onConnect = _a.onConnect, onRefresh = _a.onRefresh, onDispatch = _a.onDispatch, suspense = _a.suspense, custom = _a.custom, children = _a.children, props = __rest(_a, ["onDisconnect", "onConnect", "onRefresh", "onDispatch", "suspense", "custom", "children"]);
    var socket = useSocket(props);
    react_1.default.useEffect(function () {
        if (socket) {
            socket.on("disconnect", function () {
                if (onDisconnect)
                    onDisconnect(socket);
            });
            socket.on("dispatch", function (data) {
                if (onDispatch)
                    onDispatch(data);
            });
            socket.on("connect", function () {
                if (onConnect)
                    onConnect(socket);
            });
            socket.on("refresh", function (data) {
                if (onRefresh)
                    onRefresh(data);
            });
            for (var key in custom) {
                if (Object.prototype.hasOwnProperty.call(custom, key)) {
                    socket.on(key, custom[key]);
                }
            }
        }
    }, [socket]);
    if (socket) {
        return react_1.default.createElement(context_1.IoContext.Provider, { value: socket, children: children });
    }
    else {
        return react_1.default.createElement(react_1.default.Fragment, null, suspense || children);
    }
};
exports.default = SocketIoProvider;
