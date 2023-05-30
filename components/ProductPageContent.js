import Image from 'next/image'
import ProductForm from './ProductForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import RecommendedList from './RecommendedList'
import ReviewList from "./ReviewList"
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductPageContent({ product }) {
const images = []

product.images.edges.map((image, i) => {
  images.push(
    <SwiperSlide key={`slide-${i}`}>
      <Image src={image.node.url} alt={image.node.altText} fill className='object-cover w-full' />
    </SwiperSlide>
  )
})

console.log(product);

SwiperCore.use([Navigation, Pagination])

  return (
    <div>
      <ProductForm product={product} />
      <ReviewList />
      <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} />
    </div>
  )
}