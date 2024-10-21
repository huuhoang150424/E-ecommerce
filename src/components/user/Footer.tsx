

export default function Footer() {
  return (
    <div className='mt-[50px] flex flex-col  justify-between'>
      <div className="wrapper py-[70px] border-t-[1px] border-gray-200 flex items-center gap-[30px]  ">
        <div className="flex flex-col gap-[20px] w-[30%]">
          <div className="flex  items-center gap-[8px] ">
            <i className="fa-brands fa-adversal text-[40px] text-primaryColor "></i>
            <h1 className="text-[30px] font-[800] text-textColor ">Brown<span className="text-primaryColor">Market</span></h1>
          </div>
          <div className="">
            <span className="text-[14px] text-gray-400">
              Brown Market is the biggest market of grocery products. Get your daily needs from our store.
            </span>
          </div>
          <div className="flex items-center gap-[15px] ">
            <a href="">
              <img
                src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/app/android.png"
                className="object-fill w-[120px] h-[40px] rounded-[6px] "
                alt="ảnh"
              />
            </a>
            <a href="">
              <img
                src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/app/apple.png"
                className="object-fill w-[120px] h-[40px] rounded-[6px] "
                alt="ảnh"
              />
            </a>
          </div>
        </div>
        <div className="flex  gap-[60px] w-[70%] ">
          <div className="flex flex-col gap-[10px] flex-1">
            <h2 className="text-[18px] text-textColor leading-[24px] font-[500] ">Category</h2>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <ul className="flex flex-col gap-[10px] ">
              {
                Array(5).fill(0).map((_, index) => {
                  return (
                    <li key={index} className=""><span className="text-[14px] text-gray-400">Dairy & Milk</span></li>
                  )
                })
              }
            </ul>
          </div>
          <div className="flex flex-col gap-[10px] flex-1">
            <h2 className="text-[18px] text-textColor leading-[24px] font-[500] ">Company</h2>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <ul className="flex flex-col gap-[10px] ">
              {
                Array(5).fill(0).map((_, index) => {
                  return (
                    <li key={index} className=""><span className="text-[14px] text-gray-400">Dairy & Milk</span></li>
                  )
                })
              }
            </ul>
          </div>
          <div className="flex flex-col gap-[10px] flex-1">
            <h2 className="text-[18px] text-textColor leading-[24px] font-[500] ">Account</h2>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <ul className="flex flex-col gap-[10px] ">
              {
                Array(5).fill(0).map((_, index) => {
                  return (
                    <li key={index} className=""><span className="text-[14px] text-gray-400">Dairy & Milk</span></li>
                  )
                })
              }
            </ul>
          </div>
          <div className="flex flex-col gap-[10px] flex-1">
            <h2 className="text-[18px] text-textColor leading-[24px] font-[500] ">Contact</h2>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <ul className="flex flex-col gap-[10px] ">
              <li className="flex items-start gap-[10px] ">
                <i className="fa-solid fa-location-dot text-[16px] text-primaryColor "></i>
                <span className="text-[14px] text-gray-400">2548 Broaddus Maple Court, Madisonville KY 4783, USA.</span>
              </li>
              <li className="flex items-center gap-[10px] ">
                <i className="fa-solid fa-phone text-[16px] text-primaryColor "></i>
                <span className="text-[14px] text-gray-400">+ 03499 387373.</span>
              </li>
              <li className="flex items-center gap-[10px] ">
                <i className="fa-solid fa-envelope text-[16px] text-primaryColor "></i>
                <span className="text-[14px] text-gray-400">nguyenhoanghuu15042004@gmail.com</span>
              </li>
              <li className="mt-[10px] flex items-center  gap-[10px] ">
                <a className="flex items-center justify-center px-[10px] py-[7px] rounded-[6px] bg-primaryColor" href="">
                  <i className="fa-brands fa-facebook-f text-white "></i>
                </a>
                <a className="flex items-center justify-center px-[10px] py-[7px] rounded-[6px] bg-primaryColor" href="">
                  <i className="fa-brands fa-linkedin-in text-white "></i>
                </a>
                <a className="flex items-center justify-center px-[10px] py-[7px] rounded-[6px] bg-primaryColor" href="">
                  <i className="fa-brands fa-instagram text-white "></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between  border-t-[1px] border-gray-200 wrapper bg-slate-100 py-[16px] " >
        <span className="text-gray-400">Copyright © Grabit all rights reserved. Powered by Grabit.</span>
        <div className="">
          <img
            src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/hero-bg/payment.png"
          />
        </div>
      </div>
    </div>
  )
}
