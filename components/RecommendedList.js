import ProductCard from "./ProductCard"


const RecommendedList = ({ products, current }) => {

  return (
    <div className="bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-black dark:text-white mb-6">
          SHOP NOW
        </h2>
        <div className="text-white dark:text-black grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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