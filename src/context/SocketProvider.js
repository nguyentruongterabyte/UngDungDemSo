import { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import config from '~/config';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(io(config.constants.WEBSOCKET_SERVER));
  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
