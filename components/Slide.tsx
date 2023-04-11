import { useEffect, useState } from 'react';
import { getCollections } from '../lib/Shopify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';

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
            className="h-full w-full"
            keyboard={{
                enabled: true,
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Keyboard]}
            navigation={true}
        >
        <div className="h-full w-full">
            {
                data.map((d, i)=>{
                    return <SwiperSlide key={i}>
                        <div className='flex flex-col h-screen items-center justify-center mb-12 min-h-full'>
                            <Image src={d.node.image.url} alt={(d.node.image.altText != null) ? d.node.image.altText : d.node.title} className='object-cover' fill/>
                            <div className='flex flex-row mt-[10rem] z-[2] items-center justify-between w-full'>
                                <div className='w-80'></div>
                                <div className='z-[2]'>
                                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-gray-500 dark:text-white text-center">{d.node.title}</h1>
                                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-white text-center">{d.node.description}</p>

                                </div>
                                <div className='flex flex-row p-5 text-white z-[2] mt-[-0.5rem] w-80'></div>
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