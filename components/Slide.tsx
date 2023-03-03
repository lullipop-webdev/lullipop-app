import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    heading: string,
    message: string
}

const Slider: React.FC<Props> = ({heading, message}) => {
    return (
        <Swiper
        slidesPerView={1}
        className="h-full w-full"
        keyboard={{
            enabled: true,
            }}
        modules={[Navigation, Keyboard]}
        navigation={true}
        >
        <div className="h-full w-full">
            <SwiperSlide>
                <div className='flex flex-col h-screen items-center justify-center mb-12 min-h-full'>
                    <Image src="https://storage.googleapis.com/lullipop-image-dump/003%20Petra%20Photo%20Shoots/Lullipop_Jeans/JEZ_1642.jpg" alt='lullipop' className='object-cover' fill/>
                    {/* <div className='flex'>
                        <div className='flex flex-row p-5 text-white z-[2] mt-[6rem] space-x-56'>
                            <p className='py-5 text-xs w-3 '>Trending Collection</p>
                            <h1 className='text-6xl font-bold tracking-widest'>{heading}</h1>
                        </div>  
                    </div> */}
                    <div className='flex flex-row mt-[10rem] z-[2] items-center justify-between w-full'>
                        <div className='w-80'>

                        </div>
                        <div className='z-[2]'>
                            <Link href="/products">
                                <button className='px-8 py-2 border-2 border-pink-400 rounded-3xl text-white'>View Products</button>
                            </Link>
                        </div>
                        <div className='flex flex-row p-5 text-white z-[2] mt-[-0.5rem] w-80'>
                            {/* <h1 className='text-sm font-bold text-black'>Info</h1>
                            <p className='py-5 text-xs text-black'>{message}</p> */}
                        </div>
                    </div>
                </div>    
            </SwiperSlide>
        </div>
    </Swiper>
    )
}

export default Slider