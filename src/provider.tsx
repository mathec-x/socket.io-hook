import { useSocketProps, SocketIoProps, IoContextInterface } from "./types";
import React, { FC } from "react";
import { io } from "socket.io-client";
import { IoContext } from "./context";

const useSocket = (props: useSocketProps) => {
  const [socket, setSocket] = React.useState<IoContextInterface>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setSocket(io(props.url || "", props.options));
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socket;
};

const SocketIoProvider: FC<SocketIoProps> = ({
  onDisconnect,
  onConnect,
  onRefresh,
  onDispatch,
  suspense,
  custom,
  children,
  ...props
}) => {
  const socket = useSocket(props);

  React.useEffect(() => {
    if (socket) {
      socket.on("disconnect", () => {
        if (onDisconnect) onDisconnect(socket);
      });

      socket.on("dispatch", (data) => {
        if (onDispatch) onDispatch(data);
      });

      socket.on("connect", () => {
        if (onConnect) onConnect(socket);
      });

      socket.on("refresh", (data) => {
        if (onRefresh) onRefresh(data);
      });

      for (const key in custom) {
        if (Object.prototype.hasOwnProperty.call(custom, key)) {
          socket.on(key, custom[key]);
        }
      }
    }
  }, [socket]);

  if (socket) {
  return <IoContext.Provider value={socket} children={children} />;
  } else {
    return <>{suspense || children}</>;
  }
};

export default SocketIoProvider;
