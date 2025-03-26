import { CartScreen, CheckOutScreen, HomeScreen, NotFoundScreen, ProductDetailScreen, SearchScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';
import { MainLayout} from '@/layout';
import ProfileRouter from './ProfileRouter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getCart } from '@/redux/action/cart';
import {  FavoriteScreen, OrderScreen, ProfileScreen } from '@/screen/user';

export interface Route {
  path: string;
  element: React.ReactNode;
  breadcrumbName: string;
  children?: Route[]; 
}


export const routes: Route[] = [
  {
    path: '/',
    element: <HomeScreen />,
    breadcrumbName: 'Trang chủ',
  },
  {
    path: '/productDetail/:id',
    element: <ProductDetailScreen />,
    breadcrumbName: 'Chi tiết sản phẩm',
  },
  {
    path: '/cartScreen',
    element: <CartScreen />,
    breadcrumbName: 'Giỏ hàng',
  },
  {
    path: '/checkOutScreen',
    element: <CheckOutScreen />,
    breadcrumbName: 'Thanh toán',
  },
  {
    path: '/searchScreen/:keyword',
    element: <SearchScreen />,
    breadcrumbName: 'Tìm kiếm',
  },
  {
    path: "/profile/*",
    element: <ProfileRouter />,
    breadcrumbName: "Hồ sơ",
    children: [
      {
        path: "",
        element: <ProfileScreen />,
        breadcrumbName: "Thông tin cá nhân",
      },
      {
        path: "orderScreen",
        element: <OrderScreen />,
        breadcrumbName: "Đơn hàng",
      },
      {
        path: "favoriteScreen",
        element: <FavoriteScreen />,
        breadcrumbName: "Yêu thích",
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundScreen />,
    breadcrumbName: 'Không tìm thấy',
  },
];

export default function MainRouter() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <MainLayout>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </MainLayout>
  );
}
