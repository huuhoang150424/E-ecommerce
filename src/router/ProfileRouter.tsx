import { ProfileLayout } from '@/layout';
import {  FavoriteScreen, OrderScreen, ProfileScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';

export default function ProfileRouter() {
  return (
    <ProfileLayout>
      <Routes>
        <Route path='/' element={<ProfileScreen />} />
        <Route path='/orderScreen' element={<OrderScreen />} />
        <Route path='/favoriteScreen' element={<FavoriteScreen />} />
      </Routes>
    </ProfileLayout>
  )
}
