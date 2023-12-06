/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import config from '~/config';
import useAuth from '~/hooks/useAuth';
import useLogout from '~/hooks/useLogout';
import useSocket from '~/hooks/useSocket';
import styles from './Home.module.scss';
import useInput from '~/hooks/useInput';

const cx = classNames.bind(styles);

function Home() {
  const logOut = useLogout();
  const navigate = useNavigate();
  const [number, resetNumber, numberAttrs] = useInput('number', '');
  const [sum, setSum] = useState('');
  const { socket } = useSocket();
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState({ errorId: undefined, message: '' });
  const chatRef = useRef();

  useEffect(() => {
    // Scroll to the bottom of the chat area whenever messages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    console.log(auth?.accessToken);
    setUsername(decoded?.userInfo?.username);
    setFullName(decoded?.userInfo?.lastName + ' ' + decoded?.userInfo?.firstName);
  }, []);

  useEffect(() => {
    if (error.errorId) {
      toast.warn(error.message || '');
    }
  }, [error.errorId]);

  const signOut = async () => {
    await logOut();
    navigate(config.routes.login, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!number) {
      toast.warn('Bạn cần nhập một số!');
      return;
    }
    socket.emit('send', { number, username, fullName });
    resetNumber();
  };
  socket.on('received', (data) => {
    setSum(data.sum);
    const newMessage = {
      username: data.username,
      id: data.id,
      fullName: data.fullName,
      number: data.number,
      time: data.time,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessages((prev) => prev.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id)));
  });
  socket.on('error', (data) => {
    setError(data);
  });

  return (
    <div className={cx('wrapper')}>
      <section className={cx('messenger')}>
        <header className={cx('messenger-header')}>
          <div className={cx('messenger-header-title')}>
            Sum Sync: <span className={cx('sum')}>{sum}</span>
          </div>
          <button className={cx('log-out-btn')} onClick={signOut}>
            Đăng xuất
          </button>
        </header>
        <main className={cx('messenger-chat')} ref={chatRef}>
          <div className={cx('message', 'left-message')}>
            <div className={cx('message-bubble')}>
              <div className={cx('message-info')}>
                <div className={cx('message-info-name')}>BOT</div>
                <div className={cx('message-info-time')}>12:45</div>
              </div>
              <div className={cx('message-text')}>Số tôi vừa nhập là 1</div>
            </div>
          </div>
          <div className={cx('message', 'right-message')}>
            <div className={cx('message-bubble')}>
              <div className={cx('message-info')}>
                <div className={cx('message-info-name')}>BOT</div>
                <div className={cx('message-info-time')}>12:45</div>
              </div>
              <div className={cx('message-text')}>Số tôi vừa nhập là 1</div>
            </div>
          </div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cx('message', {
                'right-message': username === message.username,
                'left-message': username !== message.username,
              })}
            >
              <div className={cx('message-bubble')}>
                <div className={cx('message-info')}>
                  <div className={cx('message-info-name')}>{message.fullName}</div>
                  <div className={cx('message-info-time')}>{message.time}</div>
                </div>
                <div className={cx('message-text')}>Số tôi vừa nhập là {message.number}</div>
              </div>
            </div>
          ))}
        </main>
        <form className={cx('messenger-input-area')} onSubmit={handleSubmit}>
          <input
            min={1}
            max={10}
            type="number"
            className={cx('messenger-input')}
            placeholder="Nhập số từ 1 đến 10..."
            value={number}
            {...numberAttrs}
          />
          <button className={cx('messenger-send-btn')}>Gửi</button>
        </form>
      </section>
    </div>
  );
}

export default Home;
