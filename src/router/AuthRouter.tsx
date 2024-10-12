import { LoginScreen, SignUpScreen } from "@/screen/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import login from "../../public/login.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthRouter() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const currentTab = location.pathname === "/register" ? "register" : "login";
  console.log(currentTab)
  return (
    <div className="bg-[#FFFEFC] flex justify-between p-[40px]">
      <div
        className="max-w-[58%] relative overflow-hidden rounded-[16px] shadow-sm"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <img src={login} className="object-cover w-full h-full" alt="Login" />
      </div>
      <div className="w-[40%] flex flex-col items-center">
        <Tabs value={currentTab} className="w-full flex flex-col items-center mx-auto mt-[50px] mb-[30px]">
          <TabsList className="w-auto px-[12px] py-[8px] rounded-[30px] bg-[#f8eddd]">
            <TabsTrigger
              value="login"
              onClick={() => navigate("/")}
              className={`${
                currentTab === "login" ? "bg-primaryColor text-white" : "bg-transparent text-primaryColor"
              } rounded-[30px] px-8 py-2`}
            >
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => navigate("/register")}
              className={`${
                currentTab === "register" ? "bg-primaryColor text-white" : "bg-transparent text-primaryColor"
              } rounded-[30px] px-8 py-2`}
            >
              Đăng ký
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<SignUpScreen />} />
        </Routes>
      </div>
    </div>
  );
}
