import { ProfileLayout } from '@/layout';
import {  FavouriteScreen, OrderScreen, ProfileScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';

export default function ProfileRouter() {
  return (
    <ProfileLayout>
      <Routes>
        <Route path='/profileScreen' element={<ProfileScreen />} />
        <Route path='/orderScreen' element={<OrderScreen />} />
        <Route path='/favouriteScreen' element={<FavouriteScreen />} />
      </Routes>
    </ProfileLayout>
  )
}
