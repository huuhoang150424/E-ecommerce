import { Button } from "@/components/ui/button";
import { logout } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function HomeScreen() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  return (
    <div className="">
      <Button onClick={()=>{dispatch(logout()); navigate("/")}}>Đăng xuất</Button>
    </div>
  );
}
