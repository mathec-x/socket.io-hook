# socket.io-hook

written in typescript...
better hook to use with socket io, works with create-next-app or create-react-app

## Installation

```bash

npm install socket.io-hook

or

yarn add socket.io-hook

```

then install your preferred version of socket.io-client
```bash
yarn add socket.io-client
```

optional, install a custom parser to enjoy the data better
```bash
yarn add socket.io-msgpack-parser
```

## how to use

```js
import { SocketIoProvider } from "socket.io-hook";

export default function App() {
  return (
    <SocketIoProvider url="http://localhost:3001">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SocketIoProvider>
  );
}
```

- props

this is all you can do

```js
const props = {
    url?: string; // if not informed fallback to "/"
    onDisconnect?(Socket: Socket): void;
    onConnect?(Socket: Socket): void;
    onRefresh?(data: any): void;  // optional when server emit('refresh')
    onDispatch?(data: {type: string, payload: any}): DispatchProp; // optional when server emit('dispatch', { type: 'reducer_type', payload: object})
    suspense?: JSX.Element; // optional, preload while socket is not instantiated
    custom?: {
        [key: string]: (...args: any[]) => void
    };
    options?: {
        parser?: any;
        auth?: {
            [key: string]: any;
        } | ((cb: (data: object) => void) => void) | undefined
    }
}
```

## advanced usage

- src/app.js

```js
const Document = () => {
  // if you are using react-redux, useDispatch must be inside the provider
  // updating "reducers" on the server side is the best way
  // just a tip :p
  const dispatch = useDispatch();

  const rmvToken = (key) => localStorage.removeItem(key);
  const setToken = (key, x) => localStorage.setItem(key, x);

  return (
    <SocketIoProvider
      url={process.env.REACT_APP_SOCKET_URL} 
      suspense={<div className="suspense">carregando ...</div>} 
      onDispatch={dispatch} 
      onRefresh={(data) => setToken('token', data.token)}
      onDisconnect={() => rmvToken('socket-id')}
      onConnect={(socket) => {
        // if you wish, set id on localstorage to send api as header
        setToken('socket-id', socket.id);
        // do somenthing when connected
        socket.emit('signed:in')
        //or
        api.Products.get();
      }}
      //optional global custom events
      custom={{
        "preloader:on": () => {
          preloader.current.setLoading(true);
        },
        "preloader:off": () => {
          preloader.current.setLoading(false);
        }
      }}
      options={{
        parser: customParser, // usage with socket.io-msg-
        auth: (cb) => cb({ token: localStorage.getItem('token') }), // usage with .use(AUTHHANDLER) on server
      }}
    >
      <BrowserRouter>
        <AppBar />
        <Container fixed disableGutters>
          <Router />
        </Container>
        <Menu />
        <PreLoader ref={preloader}/>
      </BrowserRouter>
    </SocketIoProvider>
  );
};
```

- src/components/Login

```js
import { useSocket } from "socket.io-hook";

export default function Login(props) {
  const socket = useSocket();

  const handleLogin = (e) => {
    e.preventDefault();
    socket.emit("login", e);
    socket.disconnect();
  };

  React.useEffect(() => {
    socket.on("login:callback", (e) => {
      socket.connect();
      doSomething();
    });

    return () => socket.off("login:callback"); // destroy listener on unmount please
  }, [socket]);

  return (
    <form onSubmit={handleLogin}>
      <button type="submit">login</button>
    </form>
  );
}
```
