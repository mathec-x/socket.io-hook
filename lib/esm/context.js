import React from "react";
export var IoContext = React.createContext(IoSocketInstance || null);
export var useSocket = function () { return React.useContext(IoContext); };
