import axios from '../utils/axios';
import config from '~/config';
import useAuth from './useAuth';

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(config.constants.REFRESH, {
      withCredentials: true,
    });
    const accessToken = response?.data?.accessToken;
    setAuth((prev) => {
      return { ...prev, accessToken };
    });
    return response.data;
  };
  return refresh;
}

export default useRefreshToken;
