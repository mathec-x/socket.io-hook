import React from "react";
import { IoContextInterface } from "./types";

const IoSocketInstance: IoContextInterface = null;
export const IoContext = React.createContext<IoContextInterface>(IoSocketInstance);
export const useSocket = () => React.useContext(IoContext);
