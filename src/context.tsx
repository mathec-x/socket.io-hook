import React from "react";
import { SocketIoContextType } from "./types";

declare const IoSocketInstance: SocketIoContextType;

export const IoContext = React.createContext<SocketIoContextType>(IoSocketInstance);
export const useSocket = () => React.useContext(IoContext);
