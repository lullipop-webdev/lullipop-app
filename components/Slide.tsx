import { useEffect, useState } from 'react';
import { getCollections } from '../lib/Shopify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { GiAmpleDress } from 'react-icons/gi';
import { CiShirt } from 'react-icons/ci';

type Props = {
    heading: string,
    message: string
}

const Slider: React.FC<Props> = ({heading, message}) => {

    const [data, setData] = useState([]);
    const slider = [];
    useEffect(() => {
        getCollections().then((data) => {
            setData(data);
            console.log("data::", data);
        });
        
    }, []);

    return (
        <Swiper
            loop={true}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="h-full w-full"
            keyboard={{
                enabled: true,
            }}
            // autoplay={{
            //     delay: 5000,
            //     disableOnInteraction: false,
            // }}
            modules={[Autoplay, Navigation, Keyboard]}
            navigation={true}
        >
        <div className="h-full w-full">
            {
                data.map((d, i)=>{
                    return <SwiperSlide key={i}>

                        <div className="flex flex-col h-screen items-center justify-center mb-12 min-h-full">
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="w-full h-screen hidden lg:block object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="hidden sm:block lg:hidden w-full h-screen object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="sm:hidden w-full h-screen object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />

                            <div className='absolute mt-[10rem] z-[10] items-center justify-between w-full'>
                                <div className='w-80'></div>
                                <div className='z-[2]'>
                                    <div className="flex justify-center">
                                        <div className="w-1/4 relative">
                                        <span className="hidden text-dark-500 font-semibold dark:text-white mr-4 align-top lg:mt-1 md:mr-6 sm:mr-8 absolute inset-y-0 right-0 font-medium uppercase xl:block lg:block text-xs xl:text-sm w-1/4">Trending Collection</span>
                                        </div>
                                        <div className="w-auto">
                                            <span className="text-xs block sm:block xs:block lg:hidden text-dark-500 font-semibold dark:text-white uppercase">Trending Collection</span>
                                            <h1 className="mb-4 leading-none tracking-wide uppercase text-4xl sm:text-5xl lg:text-6xl xl:text-8xl text-gray-800 dark:text-white text-center">{d.node.title}</h1>
                                        </div>
                                        <div className="w-1/4"></div>
                                    </div>
                                    {/* <p className="mb-6 text-lg font-normal text-dark-500 lg:text-xl sm:px-16 xl:px-48 dark:text-white text-center">{    }</p> */}
                                </div>
                                <div className='z-[2] block sm:block xs:block lg:hidden'> 
                                    <div className='flex justify-center'>
                                        <div className='w-1/2 text-center'>
                                            <div className='info uppercase text-dark-500 dark:text-white text-sm font-semibold'>Info</div>
                                            <div className='info-details text-dark-500 dark:text-white text-sm'>
                                                {d.node.description}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='flex flex-row p-5 text-dark-500 z-[2] mt-0 lg:mt-[8rem] w-full relative'>
                                    <div className='w-1/4 items-center p-4 xs:justify-start'>
                                        <div className='absolute bottom-0 pb-0 pt-6 px-4'>
                                            {(i+1) + '/' + data.length}
                                        </div>
                                    </div>
                                    <div className='w-1/2 text-center pt-16 flex justify-center relative'>
                                        <div className='flex left-0 w-3/5 relative hidden'>
                                            <span className="absolute uppercase text-dark-500 dark:text-white text-sm font-semibold" style={{top: '-25px'}}>Featured Items</span>
                                            <div className='w-full flex'>
                                                <Link href="/products" className='pr-2 pl-4'>
                                                    <CiShirt className='text-pink-400 text-5xl' />
                                                </Link>
                                                <Link href="/products" className='pl-2 pr-4'>
                                                    <GiAmpleDress className='text-pink-400 text-5xl' />
                                                </Link>
                                            </div>
                                        </div>
                                        <Link href={{ pathname: '/shop', query: { q: d.node.handle } }} className='absolute'>
                                            <button className='px-8 py-2 border-2 border-pink-400 rounded-3xl text-white'>View Collection</button>
                                        </Link>
                                    </div>
                                    <div className='w-1/4 hidden xl:block lg:block'>
                                        <div className='info uppercase text-dark-500 dark:text-white text-sm font-semibold'>Info</div>
                                        <div className='info-details text-dark-500 dark:text-white text-sm mt-4 w-5/6'>
                                            {d.node.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                })
            }
        </div>
    </Swiper>
    )
}

export default Slider