
import Banner from "@/components/user/Banner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="mt-[30px] ">
      <Banner />




    </div>
  );
}
