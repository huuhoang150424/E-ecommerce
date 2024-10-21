import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/redux/authSlice';
import AdminRouter from './AdminRouter';

export default function Router() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routers>
      <Routes>
        {isAuthenticated === false ? <Route path='/*' element={<AuthRouter />} /> :
          <>
            <Route path='/*' element={<MainRouter />} />
            <Route path='/admin/*' element={<AdminRouter />} />
          </>
        }
      </Routes>
    </Routers>
  );
}
