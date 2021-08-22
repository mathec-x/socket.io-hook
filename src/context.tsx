import React from "react";
import { Socket } from "socket.io-client";

declare const IoSocketInstance: Socket;

export const IoContext = React.createContext(IoSocketInstance);
export const useSocket = () => React.useContext(IoContext);
