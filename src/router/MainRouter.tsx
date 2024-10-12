import Header from '@/components/headers/Header';
import { HomeScreen } from '@/screen/user';
import { Route, Routes } from 'react-router-dom';

export default function MainRouter() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/home' element={<HomeScreen />} />
      </Routes>
    </div>
  );
}
