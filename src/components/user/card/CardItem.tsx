import {Card,CardContent, CardHeader} from "@/components/ui/card"
import Rating from "../Rating"

interface Props {
  product?: any
}


export default function CardItem({product}:Props) {

  return (
    <Card className="max-w-[240px] border rounded-[6px] border-gray-200 cursor-pointer p-0 overflow-hidden">
      <CardHeader className="p-0 bg-white h-[260px]  overflow-hidden relative group">
        <ul className="absolute z-10 bottom-[5%]  mx-auto w-full flex gap-[10px]  justify-center items-center opacity-0 -translate-y-[-10px] transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <li className="px-[8px] py-[3px] rounded-[4px]  bg-white border border-gray-200  ">
            <i className="fa-regular fa-heart text-gray-400 "></i>
          </li>
          <li className="px-[8px] py-[3px] rounded-[4px]  bg-white border border-gray-200  ">
            <i className="fa-solid fa-cart-shopping text-gray-400"></i>
          </li>
        </ul>
        <div className="absolute top-[4%] right-[4%] z-10 px-[4px] py-[1px] rounded-[4px] bg-red-400 flex items-center justify-center ">
          <span className="text-[12px] font-[500] text-white ">-50%</span>
        </div>
        <img
          className=" h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out "
          src={product?.thumb_image}
          alt="product"
        />
      </CardHeader>
      <CardContent className="p-4">
        <span className="text-[15px] text-gray-500">
          {product?.product_name.length>20?`${product?.product_name.substring(0, 50)}...`:product?.product_name}
        </span>
        <div className="mt-[10px] ">
          <Rating
            countStar={0}
            classList="gap-[4px] "
            styleStar="text-[12px] "
          />
        </div>
        <div className="flex items-center justify-between ">
          <div className="mt-[6px] flex items-center gap-[5px] ">
            <h3 className="text-[15px]  text-textColor font-[500] ">{product?.price.toLocaleString('vi-VN')} vnđ</h3>
            <span className="line-through text-[12px] text-gray-400">20.000 vnđ </span>
          </div>
          <div className="px-[4px] py-[1px] rounded-[4px] bg-gray-200 flex items-center justify-center ">
            <span className="text-[12px] font-[500] text-gray-400 ">-50%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
