import { AdminLayout } from "@/layout";
import { selectIsAuthenticated } from "@/redux/authSlice";
import {DashBoardScreen, ProductScreen} from "@/screen/admin";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from 'react-router-dom';


export default function AdminRouter() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = true;
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/home" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<DashBoardScreen />} />
        <Route path="/product" element={<ProductScreen />} />
      </Routes>
    </AdminLayout>
  );
}
