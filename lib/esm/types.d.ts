/// <reference types="react" />
import { DispatchProp } from "react-redux";
import type { Socket, SocketOptions } from "socket.io-client";
export declare type useSocketProps = SocketOptions & {
    url?: string;
    options?: {
        parser?: any;
        auth?: {
            [key: string]: any;
        } | ((cb: (data: object) => void) => void) | undefined;
    };
};
export declare type SocketIoContextType = Socket;
export declare type SocketIoProps = useSocketProps & {
    onDisconnect?(Socket: Socket): void;
    onConnect?(Socket: Socket): void;
    onRefresh?(data: any): void;
    onDispatch?(data: {
        type: string;
        payload: any;
    }): DispatchProp;
    preloader?: JSX.Element;
    custom?: {
        [key: string]: (...args: any[]) => void;
    };
};