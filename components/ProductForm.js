import { useState, useEffect, useContext } from "react"
import { formatter } from '../utlis/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import axios from "axios"
import useSWR from 'swr'
import Image from "next/image"
import Link from "next/link"

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
      <div className="min-width-full min-h-full">
        <Link href={collection.node.handle}>
          <Image src={collection.node.images.edges[0].node.url} alt={collection.node.images.edges[0].node.altText} width={100} height={90} className='object-fill rounded-xl'/>
        </Link>
      </div>
    )
  })
  
  return (
    <div className="flex flex-col w-full p-4 xl:w-1/4 lg:w-1/4 xl:justify-start xl:items-start sm:justify-center sm:items-center text-black dark:text-white">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>

      <div className="flex flex-row w-full justify-between mt-2 mb-2 xl:justify-between xl:items-start sm:justify-center sm:space-x-6">
          <p className="text-xs">available in these colors</p>
          <a href="#" className="text-xs text-pink-400 underline">Size Guide</a>
      </div>
      <div className="flex flex-row w-full space-x-4 mb-2 sm:justify-center sm:space-x-6 xl:justify-start xl:items-start">
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
      {
        available ?
          <button
            onClick={() => {
              addToCart(selectedVariant)
            }}
            className="px-2 py-3 mt-3 text-white bg-pink-400 rounded-lg hover:bg-gray-800 w-full space-x-4 mb-2 lg:w-full sm:w-2/3 sm:justify-center sm:space-x-6">Add To Cart
          </button> :
          <button
            className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed">
              Sold out!
          </button>
      }
    </div>
  )
}
