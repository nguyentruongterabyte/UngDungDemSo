import { useState } from 'react';
import classnames from 'classnames/bind';

import styles from './Register.module.scss';

const cx = classnames.bind(styles);

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor="username">
        Tên tài khoản
      </label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
    </div>
  );
}

export default Register;
