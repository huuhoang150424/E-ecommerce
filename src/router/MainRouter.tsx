import { CartScreen, CheckOutScreen, HomeScreen, NotFoundScreen, ProductDetailScreen, SearchScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';
import { MainLayout} from '@/layout';
import ProfileRouter from './ProfileRouter';

export default function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/productDetail/:id' element={<ProductDetailScreen />} />
        <Route path='/cartScreen' element={<CartScreen />} />
        <Route path='/checkOutScreen' element={<CheckOutScreen />} />
        <Route path='/searchScreen' element={<SearchScreen />} />
        <Route path='/profile/*' element={<ProfileRouter />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </MainLayout>
  );
}
