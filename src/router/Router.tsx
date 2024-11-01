import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectToken } from '@/redux/authReducer';
import AdminRouter from './AdminRouter';
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
  isAdmin: Boolean;
  user_id: String
}

export default function Router() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token=useSelector(selectToken);
  let isAdmin;
  if (token) {
    isAdmin=jwtDecode<TokenPayload>(token).isAdmin;
  }

  return (
    <Routers>
      <Routes>
        {isAuthenticated === false ? <Route path='/*' element={<AuthRouter />} /> :
          <>
            <Route path='/*' element={<MainRouter />} />
            {
              isAdmin && (<Route path='/admin/*' element={<AdminRouter />} />)
            }
          </>
        }
      </Routes>
    </Routers>
  );
}
