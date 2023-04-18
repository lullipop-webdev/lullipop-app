import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
//import { formatter } from '../utlis/helpers'

const ProductCard = ({ product }) => {
  const { handle, title } = product.node

  const { altText, url } = product.node.images.edges[0].node
  const price = product.node.priceRange.minVariantPrice.amount
  const productType = product.node.productType;

  useEffect(() => {}, []);

  return (
    (<Link href={`/products/${handle}`} className="group relative">
      <div className="group relative px-4">
        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={url} alt={altText} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-dark-700 dark:text-white">
              <span aria-hidden="true" className="absolute inset-0"></span>
                {title}
              </h3>
            <p className="mt-1 text-sm text-gray dark:text-white">{productType}</p>
          </div>
          <p className="text-sm font-medium text-dark-500 dark:text-white">${price}</p>
        </div>
      </div>
      {/* <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
        <div className="relative group-hover:opacity-75 h-72">
          <Image 
            src={url}
            alt={altText}
            fill
            className='object-cover'
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-black dark:text-white">{price}</p>
      <h3 className="mt-2 text-lg font-medium text-black dark:text-white">{title}</h3> */}

    </Link>)
  );
}

export default ProductCard