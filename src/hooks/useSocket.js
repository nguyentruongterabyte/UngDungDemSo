import { useContext } from 'react';
import SocketContext from '~/context/SocketProvider';

function useSocket() {
  return useContext(SocketContext);
}

export default useSocket;
