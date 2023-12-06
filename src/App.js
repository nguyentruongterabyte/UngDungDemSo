/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import config from '~/config';
import PersistLogin from '~/components/PersistLogin';
import RequireAuth from '~/components/RequireAuth';

const ROLES = {
  User: 2001,
  Admin: 5150,
};
function App() {
  return (
    // <Login socket={socket} />
    <>
      <BrowserRouter>
        <Routes>
          {/*public routes*/}
          <Route path={config.routes.login} element={<Login />} />
          <Route path={config.routes.register} element={<Register />} />

          {/*private routes*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
              <Route path={config.routes.home} element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
