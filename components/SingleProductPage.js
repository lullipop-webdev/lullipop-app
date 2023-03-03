import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import Image from 'next/image';
import 'swiper/css';


export default function SingleProductPage() {
    const images = ['https://cdn.shopify.com/s/files/1/0691/7881/8843/products/JEZ_1944.jpg?v=1671219499',  'https://cdn.shopify.com/s/files/1/0691/7881/8843/products/JEZ_2123.jpg?v=1671219517'];
    const slider = [];
    images.map((image, i) => {
        slider.push(
            <SwiperSlide key={`slide-${i}`}>
                <Image src={image} alt="Lullipop" fill className='object-cover' />
            </SwiperSlide>
        )
    })

    return (
        
        <div className='flex flex-col w-11/12 max-w-7xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8'>
            <div className='flex flex-row w-full bg-white border shadow-lg md:w-2/3'>
                <div className="relative w-full h-full">
                    <Swiper
                    slidesPerView={2}
                    spaceBetween="20"
                    className="h-full"
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                    >
                        {slider}
                    </Swiper>
                </div>
                
                
            </div>
        </div>
    )
}
