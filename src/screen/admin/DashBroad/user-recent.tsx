import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from '@tanstack/react-query';
import { getStatisticalUser } from './api';

function RecentSales() {
  const { isLoading, data } = useQuery({
    queryKey: ['userAnalysis'],
    queryFn: getStatisticalUser,
  });


  console.log(data?.result?.data)

  return (
    <ScrollArea className=" h-[380px] mt-[-10px]  ">
      {
        data?.result?.data?.map((user:any,index:number) => {
          return (
            <div key={index} className=' flex mt-[15px] items-center px-[20px] '>
              <img
                className='object-cover border border-gray-200 w-[40px] h-[40px] rounded-full '
                src={user?.avatar}
                alt=''
              />
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>{user?.name}</p>
                <p className='text-sm text-muted-foreground'>
                {user?.email}
                </p>
              </div>
              <div className='ml-auto font-medium'>{user?.order_count} đơn</div>
            </div>
          )
        })
      }

    </ScrollArea>

  )
}


export default function UserRecent() {





  return (
    <Card className='col-span-1 lg:col-span-3 rounded-[6px] border border-gray-200 shadow-sm cursor-pointer dark:bg-colorDarkMode dark:border-borderDarkMode transition-all duration-500 ease-linear'>
      <CardHeader className='py-[15px] '>
        <CardTitle>Danh sách người dùng mua hàng nhiều nhất</CardTitle>
        <CardDescription>
          20 người dùng mua hàng nhiều nhất.
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-[25px] pt-0 px-0'>
        <RecentSales />
      </CardContent>
    </Card>
  )
}
