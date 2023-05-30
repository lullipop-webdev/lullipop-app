import ProductCard from "./ProductCard"


const RecommendedList = ({ products, current }) => {

  return (
    <div className="bg-white dark:bg-black">
      <div className="container my-24 px-6 mx-auto">
        <h2 className="text-2xl text-black dark:text-white mb-6">
          SHOP NOW
        </h2>
        <div className="text-white dark:text-black grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            products.map(product => (
              product.node.id === current ? null : <ProductCard key={product.node.id} product={product} />
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default RecommendedList