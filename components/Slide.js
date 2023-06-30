import { useEffect, useState, useRef } from 'react';
import { getCollections } from '../lib/Shopify';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Lingerie, Dress} from './SvgIcons';
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { GiAmpleDress } from 'react-icons/gi';
import { CiShirt } from 'react-icons/ci';

const Slider = ({heading, message}) => {
    const swiperRef = useRef(null);

    const goToNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    
    const goToPreviousSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const [data, setData] = useState([]);
    const slider = [];
    useEffect(() => {
        getCollections().then((data) => {
            setData(data);
            console.log("data::", data);
            setNextValue(data[0]);
        });
        
    }, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const [nextValue, setNextValue] = useState("NEXT");
    const [prevValue, setPrevValue] = useState("PREV");

    return (
        <Swiper
            loop={true}
            slidesPerView={1}
            onSlideChange={(swiper) => {
                swiperRef.current = swiper;
                const currentIndex = swiper.realIndex;
              
                setActiveIndex(currentIndex);
              
                const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : data.length - 1;
                const nextIndex = currentIndex + 1 < data.length ? currentIndex + 1 : 0;
              
                setPrevValue(data[prevIndex]);
                setNextValue(data[nextIndex]);
              
                console.log('Current Index:', currentIndex);
                console.log('Previous Value:', data[prevIndex]);
                console.log('Next Value:', data[nextIndex]);
            }}
            className="h-full w-full"
            keyboard={{
                enabled: true,
            }}
            modules={[Autoplay, Navigation, Keyboard]}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
        >
        <div className="h-full w-full">
            {
                data.map((d, i)=>{
                    return <SwiperSlide key={i}>

                        <div className="flex flex-col h-screen items-center justify-center mb-12 min-h-full relative">
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="w-full h-screen hidden lg:block object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="hidden sm:block lg:hidden w-full h-screen object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className="sm:hidden w-full h-screen object-cover" width={200} height={160} sizes="(max-width: 768px) 100vh, " />
                            <div className="absolute inset-0 dark:bg-black bg-gradient-to-t from-white to-40% dark:opacity-20 opacity-50"></div>
                            
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
                                        <div className='flex left-0 w-3/5 relative'>
                                            <span className="absolute uppercase text-dark-500 dark:text-white text-sm font-semibold" style={{top: '-25px'}}>Featured Item</span>
                                            <div className='w-full flex'>
                                                <Link href="/products" className='pr-2 pl-4'>
                                                    <Lingerie className="text-pink-400 text-5xl"/>
                                                </Link>
                                                <Link href="/products" className='pl-2 pr-4'>
                                                    <Dress className='text-pink-400 text-5xl' />
                                                </Link>
                                            </div>
                                        </div>
                                        <Link href={{ pathname: '/shop', query: { q: d.node.handle } }} className='absolute'>
                                            <button className='relative px-8 py-2 border-2 border-pink-400 rounded-3xl dark:text-white transition-all duration-300 hover:bg-pink-400'>View Collection</button>
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
        <div className="flex-col swiper-button-next content-none after:hidden font-semibold text-gray-800 left-[3px]" onClick={goToNextSlide}>
            {(nextValue && nextValue.node && nextValue.node.title) ?  (<>
                {nextValue.node.title}
                <span className="text-xs p-3 relative">
                    <span className="absolute top-1/2 left-full transform -translate-y-1/2 w-[20px] border-t border-gray-800 dark:border-white"></span>
                    NEXT
                </span>
            </>): ''} 
        </div>
        <div className="flex-col swiper-button-prev content-none after:hidden font-semibold text-gray-800 right-[30px]" onClick={goToPreviousSlide}>
            {(prevValue && prevValue.node && prevValue.node.title) ? (
            <>
                {prevValue.node.title}
                <span className="text-xs p-3 relative">
                    <span className="absolute top-1/2 right-full transform -translate-y-1/2 w-[20px] border-t border-gray-800 dark:border-white"></span>
                    PREV
                </span>
            </> ): ''}
            
        </div>
    </Swiper>
    )
}

export default Slider