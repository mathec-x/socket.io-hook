import React from "react";
import { Socket } from "socket.io-client";
export declare const IoContext: React.Context<Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>>;
export declare const useSocket: () => Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>;
