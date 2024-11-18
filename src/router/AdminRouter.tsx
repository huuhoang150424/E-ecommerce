import { AdminLayout } from "@/layout";
import { selectIsAuthenticated } from "@/redux/authReducer";
import { CategoryScreen, CreateProductScreen, DashBoardScreen, ProductScreen, UserScreen, WarehouseScreen } from "@/screen/admin";
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
        <Route path="/createProduct" element={<CreateProductScreen />} />
        <Route path="/category" element={<CategoryScreen />} />
        <Route path="/users" element={<UserScreen />} />
        <Route path="/warehouse" element={<WarehouseScreen />} />
      </Routes>
    </AdminLayout>
  );
}
