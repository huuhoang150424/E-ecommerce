import { AdminLayout } from "@/layout";
import { selectIsAuthenticated } from "@/redux/authReducer";
import { AttributesScreen, CategoryScreen, CreateProductScreen, DashBoardScreen, OrderScreen, ProductScreen, ReviewScreen, UserScreen, WarehouseScreen } from "@/screen/admin";
import EditProductScreen from "@/screen/admin/Products/EditProduct";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from 'react-router-dom';


export default function AdminRouter() {
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
        <Route path="/editProduct/:slug" element={<EditProductScreen />} />
      </Routes>
    </AdminLayout>
  );
}
