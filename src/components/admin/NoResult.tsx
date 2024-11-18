import React from 'react'

export default function NoResult() {
  return (
    <div className='w-full border border-gray-200 rounded-[4px] overflow-hidden my-[30px] '>
      <div className="w-full py-[12px] bg-gray-100 border-b-[1px] border-gray-200 flex justify-center ">
        <h1 className="text-[15px] text-textColor ">
          Không có dữ liệu
        </h1>
      </div>
      <div className=" ">
        <div className=" mx-auto px-10 py-4  rounded-lg ">
          <div>
            <span className="bg-green-100 font-mono text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Không có dữ liệu của bạn</span>
          </div>
          <div className="flex flex-col justify-center py-12 items-center">
            <div className="flex justify-center items-center">
              <img className="w-64 h-64" src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg" alt="image empty states" />
            </div>
            <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">Khởi tạo 1 dữ liệu mới dành cho ban ngay!</h1>
            <p className="text-gray-500 text-center mb-6">Dự án Ecomareweb dành cho bạn.Hãy tạo dữ liệu theo cách của bạn ''</p>
            <div className="flex flex-col justify-center">
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6  mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thêm danh mục
              </button>
              <a  className="underline mt-4 text-sm font-light mx-auto">Xem thêm</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
