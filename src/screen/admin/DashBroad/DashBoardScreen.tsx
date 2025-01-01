
import ListCards from '@/screen/admin/DashBroad/card'
import Chart from '@/screen/admin/DashBroad/chart'
import UserRecent from '@/screen/admin/DashBroad/user-recent'

export default function DashBoardScreen() {

  return (
    <div className="  ">
      <h1 className='mb-[15px] text-[20px] font-[700] text-textColor dark:text-white'>Tổng quan</h1>
      <ListCards/>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7 mt-[20px] '>
        {/* chart */}
        <Chart/>
        {/* user recent */}
        <UserRecent/>
      </div>
    </div>
  )
}





