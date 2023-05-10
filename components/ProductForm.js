import { useState, useEffect, useContext } from "react"
import { formatter } from '../utlis/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import axios from "axios"
import useSWR from 'swr'
import Image from "next/image"
import Link from "next/link"
import StarRating from "./StarRating"

import { Swiper, SwiperSlide } from 'swiper/react'
import { BiPlus, BiMinus } from 'react-icons/bi';
import { GiClothes } from 'react-icons/gi';
import { TbTruckDelivery, TbHeart } from 'react-icons/tb';

// setup inventory fetcher
const fetchInventory = (url, id) => 
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)
    
export default function ProductForm({ product }) {
  // const { data: productInventory } = useSWR(
  //   [`/api/available/${product.handle}`],
  //   (url, id) => fetchInventory(url, id),
  //   { errorRetryCount: 3 }
  // )

  const [available, setAvailable] = useState(true)
  
  const {addToCart} = useContext(CartContext)

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity((prev) => prev + 1);
    const updatedItem = {
      ...selectedVariant,
      variantQuantity: quantity+1
    };
    setSelectedVariant(updatedItem);
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      const updatedItem = {
        ...selectedVariant,
        variantQuantity: quantity-1
      };
      setSelectedVariant(updatedItem);
    }
  }
  


  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  // useEffect(() => {
  //   if (productInventory) {
  //     const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

  //     if (checkAvailable[0]?.node.availableForSale) {
  //       setAvailable(true)
  //     } else {
  //       setAvailable(false)
  //     }
  //   }
  // }, [productInventory, selectedVariant])

  const collectionOptions = []
  product.collections.edges[0].node.products.edges.map((collection, i) => {
    collectionOptions.push(
      <div className="min-width-full min-h-full" key={'image-' + i}>
        <Link href={collection.node.handle}>
          <Image src={collection.node.images.edges[0].node.url} alt={collection.node.images.edges[0].node.altText} width={100} height={90} className='object-fill rounded-xl'/>
        </Link>
      </div>
    )
  })

  const images = []

  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image src={image.node.url} alt={image.node.altText} fill className='object-cover w-full' />
      </SwiperSlide>
    )
  })
  
  return (
    <div className="container my-24 px-6 mx-auto">

      <nav className="flex flex-col" aria-label="Breadcrumb">
        <ol className="inline-flex items-left space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-dark hover:text-blue-600 dark:text-white dark:hover:text-white">
              Home
            </a>
          </li>
          <span className="mx-2 dark:text-white">/</span>
          <li className="flex items-center">
            <a href="/shop" className="ml-1 text-sm font-medium text-dark hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-white">Shop</a>
          </li>
          <span className="mx-2 dark:text-white">/</span>
          <li aria-current="page" className="flex items-center">
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-white">{product.title}</span>
          </li>
        </ol>
      </nav>

      <section className="mb-32 text-gray-800 pt-12">

        <div className="flex items-center relative">
          <h1 className="text-3xl uppercase inline-block bg-white dark:bg-black z-10 pr-10 text-dark font-semibold dark:text-white">Shop Triangle Set</h1>
          <div className="absolute border-gray-500 transform w-full border-2"></div>
        </div>

        <div className="flex flex-wrap mb-6 lg:mb-12 pt-12">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pr-6 mb-6 lg:mb-0">
            <div className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg">
              <Swiper
                loop={true}
                slidesPerView={1}
                style={{ '--swiper-pagination-color': '#000' }}
                navigation={true}
                pagination={{ clickable: true }}
                className="h-138"
                keyboard={{
                  enabled: true,
                }}
              >
                {images}
                {/* <div className="swiper-button-prev"></div> 
                <div className="swiper-button-next"></div>   */}
              </Swiper>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
            <div className="flex align-center">
              <h3 className="text-4xl font-bold mb-4 text-dark dark:text-white w-3/4">{product.title}</h3>
              <TbHeart size={48} className='w-1/4 text-pink-400'/>
            </div>
            <div className="text-4xl text-dark dark:text-white mb-4 flex items-center font-medium mt-6 mb-24">
              {formatter.format(product.variants.edges[0].node.priceV2.amount)}
            </div>

            <div className="hidden flex flex-row w-full space-x-4 mb-2 sm:justify-center sm:space-x-6 xl:justify-start xl:items-start">
              {collectionOptions}
            </div>

            {
              product.options.map(({ name, values }) => (
                <ProductOptions
                  key={`key-${name}`}
                  name={name}
                  values={values}
                  selectedOptions={selectedOptions}
                  setOptions={setOptions}
                  selectedVariant={selectedVariant}
                  // productInventory={productInventory}
                  available={available}
                />
              ))
            }

            <div className='flex align-center grid-cols-1 gap-x-8 my-8'>
              <a href="#" className="text-dark dark:text-white underline uppercase flex items-center"><GiClothes size={24} className='mr-2' />SIZING GUIDE</a>
              <a href="#" className="text-dark dark:text-white underline uppercase flex items-center"><TbTruckDelivery size={24} className='mr-2' />Delivery & return</a>
            </div>

            {
              available ?
                <div className="flex flex-row items-center w-full gap-x-6">
                  <div className="border w-1/4 flex justify-center items-center h-14 px-6">
                    <button className="w-8 h-full text-dark dark:text-white focus:outline-none" onClick={decrement}>
                      <BiMinus className="h-6 w-6 fill-current" size={24}/>
                    </button>
                    <input
                      className="w-full text-center bg-white dark:bg-black dark:text-white text-dark outline-none focus:outline-none hover:text-black focus:text-black"
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      min={0}
                      max={99}
                      readOnly
                    />
                    <button className="w-1/4 h-full text-dark dark:text-white focus:outline-none" onClick={increment}>
                      <BiPlus className="h-6 w-6 fill-current" size={24}/>
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      onClick={() => {
                        addToCart(selectedVariant, quantity);
                      }}
                      className="px-2 py-3 mt-3 text-white bg-pink-400 rounded-lg hover:bg-gray-800 w-full space-x-4 mb-2 lg:w-full sm:w-2/3 sm:justify-center sm:space-x-6"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              :
                <button className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed">
                  Sold out!
                </button>
            }

          </div>
        </div>

        <div className="flex items-center pt-6 lg:pt-12 pb-6 relative">
          <h1 className="text-2xl uppercase inline-block bg-white dark:bg-black z-10 pr-10 text-dark dark:text-white">Product Description</h1>
          <div className="absolute border-gray-500 transform w-full border-2"></div>
        </div>

        
        <p className="text-dark dark:text-white">{product.description}</p>

        <div className="flex items-center py-12 relative">
          <h1 className="text-2xl uppercase inline-block bg-white dark:bg-black z-10 pr-10 text-dark dark:text-white">Reviews</h1>
          <div className="absolute border-gray-500 transform w-full border-2"></div>
        </div>

        <div className="flex flex-wrap px-2 xl:px-24">
          <div className="w-full xl:w-1/2 px-2 xl:px-24">
            <h1 className="text-dark text-center dark:text-white text-4xl mb-8">Recommendations (245)</h1>
            <StarRating size={80} rate={0}/>
          </div>

          <div className="w-full xl:w-1/2 px-2 xl:px-24 mt-8 xl:mt-0 flex flex-col gap-4">
            <div className="block">
              <label htmlFor="fit" className=" mb-2 text-2xl font-medium text-gray-900 dark:text-white uppercase ">FIT</label>
              <input type="range" id="fit" name="fit" min="1" max="5" className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <div className="flex justify-between text-sm text-gray-500 uppercase">
                <span>Too Tight</span>
                <span>Perfect</span>
                <span>Too Large</span>
              </div>
            </div>
            <div className="block">
              <label htmlFor="sizing" className=" mb-2 text-2xl font-medium text-gray-900 dark:text-white uppercase ">Sizing</label>
              <input type="range" id="sizing" name="sizing" min="1" max="5" className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <div className="flex justify-between text-sm text-gray-500 uppercase">
                <span>Runs Small</span>
                <span>True to size</span>
                <span>Runs Big</span>
              </div>
            </div>
            <div className="block">
              <label htmlFor="quality" className=" mb-2 text-2xl font-medium text-gray-900 dark:text-white uppercase ">Quality</label>
              <input type="range" id="quality" name="quality" min="1" max="5" className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <div className="flex justify-between text-sm text-gray-500 uppercase">
                <span>Delicate</span>
                <span>Well made</span>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  )
}
