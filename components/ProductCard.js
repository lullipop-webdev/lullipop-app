import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '../utlis/helpers'

const ProductCard = ({ product }) => {
  const { handle, title } = product.node

  const { altText, url } = product.node.images.edges[0].node

  const price = product.node.priceRange.minVariantPrice.amount

  return (
    (<Link href={`/products/${handle}`} className="group">

      <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
        <div className="relative group-hover:opacity-75 h-72">
          <Image 
            src={url}
            alt={altText}
            fill
            className='object-cover'
          />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-black dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-black dark:text-white">{formatter.format(price)}</p>

    </Link>)
  );
}

export default ProductCard