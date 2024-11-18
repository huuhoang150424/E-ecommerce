import { Button } from '@/components/ui/button'
import { selectUser } from '@/redux/authReducer'
import { useSelector } from 'react-redux'

export default function ProfileScreen() {
  const user=useSelector(selectUser)


  return (
    <div className="">
      <h2 className="text-[16px] leading-[24px] font-[400] text-textColor">Thông tin tài khoản</h2>
      <div className="mt-[15px] flex items-center gap-[40px] ">
        <div className="relative ">
          <img
            className="object-cover rounded-[50%] w-[100px] h-[100px] border border-gray-200 "
            alt=""
            src={user?.avatar}
          />
          <Button size={'square'} variant={'outline'} className="absolute flex items-center justify-center p-[5px] rounded-[50%] right-[0] top-[74%] ">
            <i className="fa-solid fa-pen"></i>
          </Button>
        </div>
        <ul className="flex flex-col gap-[10px] ">
          <li className="flex items-center gap-[30px] ">
            <h3 className="text-[16px] leading-[24px] font-[400] text-textColor ">Họ và tên: </h3>
            <p className="text-[18px] text-gray-600 ">{user?.name} </p>
          </li>
          <li className="flex items-center gap-[30px] ">
            <h3 className="text-[16px] leading-[24px] font-[400] text-textColor ">Email: </h3>
            <p className="text-[18px] text-gray-600 ">{user?.email} </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
