import { HomeScreen, NotFoundScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layout';

export default function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/home' element={<HomeScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </MainLayout>
  );
}
