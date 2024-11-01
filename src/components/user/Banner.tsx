import anh1 from "../../../public/anh1.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination'; 

export default function Banner() {
  return (
    <Swiper
      className="z-[-1]"
      spaceBetween={10} 
      slidesPerView={1}
      pagination={{
        clickable: true, // Cho phép nhấp vào pagination
        dynamicBullets: true, // Hiển thị các chấm tròn động
        renderBullet: (index, className) => {
          return `<span class="${className} w-6 h-6 rounded-full bg-transparent border-[3px] border-primaryColor  opacity-50"></span>`;
        },
      }}
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false,
      }}
      speed={2000} 
      modules={[Pagination, Autoplay]}
    >
      <SwiperSlide>
        <img
          src={anh1}
          className="rounded-[6px] w-full h-[500px] object-fill "
          alt="banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={'https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/hero-bg/2.jpg'}
          className="rounded-[6px] w-full h-[500px] object-fill "
          alt="banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={'https://insieutoc.vn/wp-content/uploads/2021/02/mau-banner-quang-cao-khuyen-mai.jpg'}
          className="rounded-[6px] w-full h-[500px] object-fill "
          alt="banner"
        />
      </SwiperSlide>
    </Swiper>
  )
}
