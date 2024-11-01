
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Rating } from "@/components/user";
import Banner from "@/components/user/Banner";
import { toast } from "@/hooks/use-toast";
import { selectIsAuthenticated, selectMessage } from "@/redux/authReducer";
import { useEffect } from "react";
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
              <Link key={index} to={`/`}>
                <Card className="max-w-[240px] border rounded-[6px] border-gray-200 cursor-pointer p-0 overflow-hidden">
                  <CardHeader className="p-0 bg-white h-[260px]  overflow-hidden relative">
                    <div className="absolute top-[4%] right-[4%] z-10 px-[4px] py-[1px] rounded-[4px] bg-red-400 flex items-center justify-center ">
                      <span className="text-[12px] font-[500] text-white ">-50%</span>
                    </div>
                    <img
                      className=" h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out "
                      src="https://culacstudio.com/wp-content/uploads/Product-DECAAR_12862.jpg"
                      alt="product"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <span className="text-[14px] text-gray-500">
                      {/* substring(0, 50) */}
                      Balo Ulzzang Học Sinh Chống Nước Hàn Quốc MARSOCI...</span>
                    <div className="mt-[10px] ">
                      <Rating
                        countStar={4}
                        classList="gap-[4px] "
                        styleStar="text-[12px] "
                      />

                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="mt-[6px] flex items-center gap-[5px] ">
                        <h3 className="text-[15px]  text-textColor font-[500] ">200.000 vnđ</h3>
                        <span className="line-through text-[12px] text-gray-400">20.000 vnđ </span>
                      </div>
                      <div className="px-[4px] py-[1px] rounded-[4px] bg-gray-200 flex items-center justify-center ">
                        <span className="text-[12px] font-[500] text-gray-400 ">-50%</span>
                      </div>
                    </div>
                  </CardContent>
                  {/* <CardFooter className="">
                  </CardFooter> */}
                </Card>
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
              <Link key={index} to={`/`}>
                <Card className="max-w-[240px] border rounded-[6px] border-gray-200 cursor-pointer p-0 overflow-hidden">
                  <CardHeader className="p-0 bg-white h-[260px]  overflow-hidden relative">
                    <div className="absolute top-[4%] right-[4%] z-10 px-[4px] py-[1px] rounded-[4px] bg-red-400 flex items-center justify-center ">
                      <span className="text-[12px] font-[500] text-white ">-50%</span>
                    </div>
                    <img
                      className=" h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out "
                      src="https://culacstudio.com/wp-content/uploads/Product-DECAAR_12862.jpg"
                      alt="product"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <span className="text-[14px] text-gray-500">
                      {/* substring(0, 50) */}
                      Balo Ulzzang Học Sinh Chống Nước Hàn Quốc MARSOCI...</span>
                    <div className="mt-[10px] ">
                      <Rating
                        countStar={4}
                        classList="gap-[4px] "
                        styleStar="text-[12px] "
                      />

                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="mt-[6px] flex items-center gap-[5px] ">
                        <h3 className="text-[15px]  text-textColor font-[500] ">200.000 vnđ</h3>
                        <span className="line-through text-[12px] text-gray-400">20.000 vnđ </span>
                      </div>
                      <div className="px-[4px] py-[1px] rounded-[4px] bg-gray-200 flex items-center justify-center ">
                        <span className="text-[12px] font-[500] text-gray-400 ">-50%</span>
                      </div>
                    </div>
                  </CardContent>
                  {/* <CardFooter className="">
                  </CardFooter> */}
                </Card>
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
