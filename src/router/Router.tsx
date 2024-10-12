import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/redux/authSlice';

export default function Router() {
  const isAuthenticated=useSelector(selectIsAuthenticated);
  return (
    <Routers>
      <Routes>
        {isAuthenticated ? <Route path='/*' element={<MainRouter />} /> : <Route path='/*' element={<AuthRouter />} />}
      </Routes>
    </Routers>
  );
}
