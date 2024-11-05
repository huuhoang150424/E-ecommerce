import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { CardItem } from "@/components/user";
import Banner from "@/components/user/Banner";
import { selectIsAuthenticated, selectMessage } from "@/redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const message = useSelector(selectMessage)
  // useEffect(() => {
  //   const showMessageLogin = localStorage.getItem('showMessageLogin')
  //   if (message && isAuthenticated && !showMessageLogin) {
  //     toast({
  //       variant: 'success',
  //       title: message
  //     })
  //     localStorage.setItem('showMessageLogin', 'true');
  //   }
  //   return ()=>{
  //     localStorage.removeItem('showMessageLogin')
  //   }
  // }, [isAuthenticated, message])


  return (
    <div className="mt-[30px] ">
      <Banner />
      <h1 className="text-[20px] font-[700] text-textColor mt-[30px] ">Danh mục sản phẩm</h1>
      <ul className="my-[30px] flex items-center gap-[20px] ">
        {
          Array(6).fill(0).map((_, index) => {
            return (
              <li key={index} className="group  relative p-[20px] rounded-[4px] bg-gradient-to-b from-[#c1deff] to-[#fff] overflow-hidden transition-all duration-1000 ease-linear">
                <div className="absolute inset-0 bg-gradient-to-b from-[#c1deff] to-[#e2f3ff]  opacity-0 transition-opacity duration-1000 ease-linear group-hover:opacity-100"></div>
                <div className="flex flex-col items-center justify-center gap-[5px] relative bg-white px-[40px] py-[30px] rounded-[4px] shadow-extra-blur z-10">
                  <i className="fa-solid fa-pepper-hot text-[30px] text-primaryColor"></i>
                  <h3 className="text-[18px] mt-[5px] font-[500] text-textColor">Trái cây</h3>
                  <span className="text-[14px] text-gray-400 font-[400]">320 sản phẩm</span>
                </div>
              </li>

            )
          })
        }

      </ul>
      <div className="mt-[50px] ">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-[20px] font-[700] text-textColor ">Sản phẩm đang <span className="text-primaryColor ">giảm giá</span></h1>
          <div className="px-[12px] py-[8px] rounded-[4px] bg-gray-100 ">
            <span className="text-[14px] font-[500] text-textColor ">305 Days 11 : 58 : 32 </span>
          </div>
        </div>
      </div>
      <div className="mt-[30px] grid grid-cols-5 gap-5">
        {
          Array(5).fill(0).map((_, index) => {
            return (
              <Link key={index} to={`/productDetail/233231`}>
                <CardItem />
              </Link>
            )
          })
        }

      </div>
      <div className="relative  mt-[60px]">
        <div className="absolute top-[18%] right-[5%] max-w-[360px] ">
          <h1 className="text-[34px] text-textColor font-[800] ">Sản phẩm đang giảm giá cao</h1>
          <h3 className="text-[30px] font-[600] text-textColor">lên đến <span className="text-primaryColor">30% </span></h3>
          <Button type='submit' variant={'primaryColor'} className=' rounded-[4px] px-[20px] flex items-center ml-auto mt-[20px] '>
            Mua ngay
          </Button>
        </div>
        <img
          src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/banner/1.jpg"
          alt=""
          className="w-full h-[330px] object-cover rounded-[8px] "
        />
      </div>
      <div className="mt-[50px] ">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-[20px] font-[700] text-textColor ">Sản phẩm mới<span className="text-primaryColor "> Ra mắt</span></h1>
          <ul className="flex items-center gap-[14px]">
            <li className=""><span className="cursor-pointer text-[16px] font-[500] text-primaryColor">Trái cây</span></li>
            {
              Array(4).fill(0).map((_, index) => {
                return (
                  <li key={index} className=""><span className="cursor-pointer text-[16px] font-[500] text-textColor">Trái cây</span></li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className="mt-[30px] grid grid-cols-5 grid-rows-2 gap-5">
        {
          Array(10).fill(0).map((_, index) => {
            return (
              <Link key={index} to={`/productDetail/233231`}>
                <CardItem />
              </Link>
            )
          })
        }

      </div>
      <div className="grid grid-cols-4 gap-[40px] mt-[50px] ">
        <Card className="border border-gray-200 rounded-[6px] ">
          <CardContent className="">

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
