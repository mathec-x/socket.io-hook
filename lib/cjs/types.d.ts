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
export declare type IoContextInterface = Socket | null;
export interface SocketIoProps extends useSocketProps {
    onDisconnect?(Socket: Socket): void;
    onConnect?(Socket: Socket): void;
    onRefresh?(data: any): void;
    onDispatch?(data: {
        type: string;
        payload: any;
    }): DispatchProp;
    suspense?: JSX.Element;
    custom?: {
        [key: string]: (...args: any[]) => void;
    };
}
