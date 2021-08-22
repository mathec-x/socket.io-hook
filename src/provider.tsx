import { useSocketProps, SocketIoProps } from './types';
import React, { FC } from 'react';
import io, { Socket } from 'socket.io-client';
import { IoContext } from './context';

const useSocket = (props: useSocketProps) => {
    const [socket, setSocket] = React.useState<Socket>();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setSocket(io(props.url || '', props.options));
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return socket;
};

const SocketIoProvider: FC<SocketIoProps> = ({ onDisconnect, onConnect, onRefresh, onDispatch, preloader, custom, ...props }) => {
    const socket = useSocket(props);

    React.useEffect(() => {
        if (socket) {
            socket.on('disconnect', () => {
                if (onDisconnect) onDisconnect(socket);
            });

            socket.on('dispatch', (data) => {
                if (onDispatch) onDispatch(data);
            });

            socket.on('connect', () => {
                if (onConnect) onConnect(socket);
            });

            socket.on('refresh', (data) => {
                if (onRefresh) onRefresh(data);
            });

            for (const key in custom) {
                if (Object.prototype.hasOwnProperty.call(custom, key)) {
                    socket.on(key, custom[key]);
                }
            }
        }

    }, [socket]);

    if(socket){
        return <IoContext.Provider value={ socket } {...props}/>;
    } else {
        return preloader||null        
    }
};


export default SocketIoProvider;