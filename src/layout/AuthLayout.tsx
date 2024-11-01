import login from "../../public/login.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";


interface Props {
  children: React.ReactNode
}



export default function AuthLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname === "/register" ? "register" : "login";
  return (
    <div className="bg-[#FFFEFC] flex justify-between p-[40px]">
      <div
        className="max-w-[58%] relative overflow-hidden rounded-[16px] shadow-sm "
        style={{ height: "calc(100vh - 80px)" }}
      >
        <img src={login} className="object-cover w-full h-full" alt="Login" />
      </div>
      <div className="w-[40%] flex flex-col items-center">
        <Tabs value={currentTab} className="w-full flex flex-col items-center mx-auto mt-[50px] mb-[30px]">
          <TabsList className="relative w-auto px-[12px] py-[8px] rounded-[30px] overflow-hidden">
            {/* overlay */}
            <div className="absolute inset-0 bg-primaryColor opacity-40 rounded-[30px] pointer-events-none"></div>
            <TabsTrigger
              value="login"
              onClick={() => navigate("/")}
              className={`${currentTab === "login" ? "bg-primaryColor text-white" : "bg-transparent text-primaryColor z-10"
                } relative rounded-[30px] px-8 py-2`}
            >
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => navigate("/register")}
              className={`${currentTab === "register" ? "bg-primaryColor text-white" : "bg-transparent text-primaryColor z-10"
                } relative rounded-[30px] px-8 py-2`}
            >
              Đăng ký
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  )
}
