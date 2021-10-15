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
import React from "react";
import { io } from "socket.io-client";
import { IoContext } from "./context";
var useSocket = function (props) {
    var _a = React.useState(null), socket = _a[0], setSocket = _a[1];
    React.useEffect(function () {
        if (typeof window !== "undefined") {
            setSocket(io(props.url || "", props.options));
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
    React.useEffect(function () {
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
        return React.createElement(IoContext.Provider, { value: socket, children: children });
    }
    else {
        return React.createElement(React.Fragment, null, suspense || children);
    }
};
export default SocketIoProvider;
