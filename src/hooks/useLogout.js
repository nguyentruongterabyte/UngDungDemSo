import config from '~/config';
import axios from '~/utils/axios';
import useAuth from './useAuth';
function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await axios.get(config.constants.LOGOUT, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
}

export default useLogout;
