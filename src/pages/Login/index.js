/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';

import styles from './Login.module.scss';
import axios from '~/utils/axios';
import config from '~/config';
import useToggle from '~/hooks/useToggle';
import useAuth from '~/hooks/useAuth';
import useInput from '~/hooks/useInput';
import useSocket from '~/hooks/useSocket';

const cx = classnames.bind(styles);

function Login() {
  const [username, resetUsername, usernameAttrs] = useInput('username', '');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', false);
  const { setAuth } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const response = axios.post(config.constants.LOGIN, JSON.stringify({ username, password }), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response
      .then((res) => {
        console.log(res);
        socket.connect();
        socket.emit('subscribe', { username });
        const accessToken = res.data?.accessToken;
        const roles = res.data?.roles;
        setAuth({ accessToken, roles });
        resetUsername();
        navigate(config.routes.home, { replace: true });
        setPassword('');
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setErrorMsg(err.response?.data?.message);
        } else if (err.response?.status === 401) {
          setErrorMsg('Đăng nhập thất bại!');
        } else if (err.response?.status === 500) {
          setErrorMsg('Lỗi máy chủ!');
        } else {
          setErrorMsg('Lỗi không xác định!');
        }
      });
  };

  useEffect(() => {
    setErrorMsg('');
  }, [password, username]);
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className={cx('wrapper')}>
          <p className={errorMsg ? cx('error-msg') : cx('offscreen')}>{errorMsg}</p>
          <label className={cx('label')} htmlFor="username">
            Tên tài khoản
          </label>
          <input autoComplete="off" type="text" id="username" {...usernameAttrs} />
          <label className={cx('label')} htmlFor="password">
            Mật khẩu
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className={cx('button')}>Đăng nhập</button>
          <div className={cx('persist-check')}>
            <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
            <label htmlFor="persist">Trust This Device</label>
          </div>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to={config.routes.register}>Sign Up</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
