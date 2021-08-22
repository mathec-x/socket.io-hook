import React from "react";
import { SocketIoContextType } from "./types";

declare const IoSocketInstance: SocketIoContextType;

export const IoContext = React.createContext<SocketIoContextType>(IoSocketInstance||null);
export const useSocket = () => React.useContext(IoContext);
