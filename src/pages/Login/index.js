import { useState } from 'react';
import classnames from 'classnames/bind';

import styles from './Login.module.scss';

const cx = classnames.bind(styles);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor="username">
        Tên tài khoản
      </label>
      <input
        className={cx('input')}
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className={cx('label')} htmlFor="password">
        Mật khẩu
      </label>
      <input
        className={cx('input')}
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={cx('button')}>Đăng nhập</button>
    </div>
  );
}

export default Login;
