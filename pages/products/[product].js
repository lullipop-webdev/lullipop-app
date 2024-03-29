import { getProduct, getProductsInCollection, recursiveCatalog } from '../../lib/Shopify';
import ProductPageContent from '../../components/ProductPageContent';
import SingleProductPage from '../../components/SingleProductPage';

export default function ProductPage({product}) {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
          <ProductPageContent product={product} />
          {/* <SingleProductPage /> */}
        </div>
    )
}

export async function getStaticPaths() {
  const products = await recursiveCatalog()

  const paths = products.map(item => {
    const product = String(item.node.handle)
    return {
      params: { product }
    }
  })

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
    const product = await getProduct(params.product)
    
    return {
      props: {
        product,
      }
    }
}

