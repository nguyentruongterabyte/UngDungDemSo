import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.scss';
import axios from '~/utils/axios';
import config from '~/config';
import useInput from '~/hooks/useInput';

const cx = classnames.bind(styles);

function Register() {
  const [username, resetUsername, usernameAttrs] = useInput('username', '');
  const [password, setPassword] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const matchPassword = password === rePwd;
    if (!matchPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!');
      return;
    }

    const response = axios.post(config.constants.REGISTER, JSON.stringify({ username, password, firstName, lastName }));
    response
      .then((res) => {
        setPassword('');
        setRePwd('');
        setFirstName('');
        setLastName('');
        resetUsername();
        navigate(config.routes.login, { replace: true });
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setErrorMsg('Tên tài khoản đã tồn tại!');
        } else if (err.response?.status === 400) {
          setErrorMsg(err.response?.data?.message);
        } else if (err.response?.status === 500) {
          setErrorMsg('Lỗi máy chủ!');
        } else {
          setErrorMsg('Lỗi không xác định!');
        }
      });
  };

  useEffect(() => {
    setErrorMsg('');
  }, [password, rePwd, username, firstName, lastName]);
  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('wrapper')}>
        <p className={errorMsg ? cx('error-msg') : cx('offscreen')}>{errorMsg}</p>
        <label className={cx('label')} htmlFor="username">
          Tên tài khoản
        </label>
        <input type="text" id="username" {...usernameAttrs} />
        <label className={cx('label')} htmlFor="lastName">
          Họ
        </label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label className={cx('label')} htmlFor="firstName">
          Tên
        </label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label className={cx('label')} htmlFor="password">
          Mật khẩu
        </label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label className={cx('label')} htmlFor="rePwd">
          Nhập lại mật khẩu
        </label>
        <input type="password" id="rePwd" value={rePwd} onChange={(e) => setRePwd(e.target.value)} />
        <button className={cx('button')}>Đăng kí</button>
        <p>
          Already registered?
          <br />
          <span className="line">
            <Link to={config.routes.login}>Sign In</Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default Register;
