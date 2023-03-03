import { getProductsInCollection } from "@/lib/Shopify"
import ProductList from '../components/ProductList'
import Head from 'next/head'

export default function Products({products}) {
    return (
        <div>
            <ProductList products={products} />
        </div>
    )
}

export async function getStaticProps() {
    const products = await getProductsInCollection()
  
    return {
      props: { products }, // will be passed to the page component as props
    }
}