import { CartScreen, CheckOutScreen, HomeScreen, NotFoundScreen, ProductDetailScreen, SearchScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';
import { MainLayout} from '@/layout';
import ProfileRouter from './ProfileRouter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getCart } from '@/redux/action/cart';

export default function MainRouter() {
  const dispatch=useDispatch<AppDispatch>()
  
  useEffect(() => {

    dispatch(getCart())
  }, [dispatch])


  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/productDetail/:id' element={<ProductDetailScreen />} />
        <Route path='/cartScreen' element={<CartScreen />} />
        <Route path='/checkOutScreen' element={<CheckOutScreen />} />
        <Route path='/searchScreen/:keyword' element={<SearchScreen />} />
        <Route path='/profile/*' element={<ProfileRouter />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </MainLayout>
  );
}
