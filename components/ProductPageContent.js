import Image from 'next/image'
import ProductForm from './ProductForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import RecommendedList from './RecommendedList'
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link'


export default function ProductPageContent({ product }) {
const images = []

product.images.edges.map((image, i) => {
  images.push(
    <SwiperSlide key={`slide-${i}`}>
      <Image src={image.node.url} alt={image.node.altText} fill className='object-cover' />
    </SwiperSlide>
  )
})

SwiperCore.use([Navigation, Pagination])

  return (
    <div>
    <div className="flex flex-col items-center justify-center min-height-full mx-auto lg:flex-row lg:items-start lg:space-x-8 my-5">
      <div className="bg-white dark:bg-black w-full max-w-3xl overflow-hidden">
      <div className="relative width-full h-138">
          <Swiper
            slidesPerView={2}
            spaceBetween="20"
            style={{ '--swiper-pagination-color': '#000' }}
            navigation={{
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            className="h-138"
            loop="true"
          >
            {images}
            <div className="swiper-button-next"></div>  
          </Swiper>
          {/* <div className="swiper-button-next"></div> */}
          </div>
      </div>
      <ProductForm product={product} />
    </div>
    {/* <p className="w-11/12 max-w-3xl pt-16 mx-auto space-y-8 md:space-x-4 lg:space-x-8">{product.description}</p> */}
    <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} />
  </div>
  
  )
}