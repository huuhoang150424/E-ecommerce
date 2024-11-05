import { CartScreen, CheckOutScreen, FavouriteScreen, HomeScreen, NotFoundScreen, OrderScreen, ProductDetailScreen, SearchScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layout';

export default function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/productDetail/:id' element={<ProductDetailScreen />} />
        <Route path='/cartScreen' element={<CartScreen />} />
        <Route path='/checkOutScreen' element={<CheckOutScreen />} />
        <Route path='/searchScreen' element={<SearchScreen />} />
        <Route path='/orderScreen' element={<OrderScreen />} />
        <Route path='/favouriteScreen' element={<FavouriteScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </MainLayout>
  );
}
