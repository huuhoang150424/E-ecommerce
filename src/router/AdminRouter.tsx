import { AdminLayout } from "@/layout";
import { selectIsAuthenticated } from "@/redux/authReducer";
import { AttributesScreen, CategoryScreen, CreateProductScreen, DashBoardScreen, OrderScreen, ProductScreen, ReviewScreen, UserScreen, WarehouseScreen } from "@/screen/admin";
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
        <Route path="/attributes" element={<AttributesScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="/order" element={<OrderScreen />} />
      </Routes>
    </AdminLayout>
  );
}
