import React from "react";
var IoSocketInstance = null;
export var IoContext = React.createContext(IoSocketInstance);
export var useSocket = function () { return React.useContext(IoContext); };
