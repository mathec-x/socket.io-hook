import React from "react";
export var IoContext = React.createContext(IoSocketInstance);
export var useSocket = function () { return React.useContext(IoContext); };