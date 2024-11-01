import { ForgotPasswordScreen, LoginScreen, SignUpScreen, VerifyCodeScreen } from "@/screen/auth";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/layout";

export default function AuthRouter() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<SignUpScreen />} />
        <Route path="/verifyCodeScreen" element={<VerifyCodeScreen />} />
        <Route path="/forgotPasswordScreen" element={<ForgotPasswordScreen />} />
      </Routes>
    </AuthLayout>
  );
}
