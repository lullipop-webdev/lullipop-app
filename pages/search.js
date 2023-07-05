import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllProducts } from '@/lib/Shopify';
import ProductCard from "@/components/ProductCard";
export default function Search() {
  const router = useRouter();
  const params = router.query.keyword;

  const [searchProducts, setSearchProducts] = useState([]);
  const [searchPages, setSearchPages] = useState([]);

  const fetchSearch = async (params) => {
    const prods = await searchAllProducts(params);

    const pages = await fetchPages(params);
    console.log(params);
    setSearchPages(pages);
    setSearchProducts(prods);
  }

  useEffect(() => {
    fetchSearch(params);
  }, [params]);

  const fetchPages = async (keyword) => {
    const storePagesData = await fetch('/api/storePagesData')
    const data = await storePagesData.json();
    var filteredData = data.filter(function(item) {
      return item.name.toLowerCase().includes(`${keyword}`.toLowerCase());
    });

    return filteredData;
  }

  return (
    <div className="mx-auto container px-4 py-8">
      <h1 className="text-5xl border-b-2 border-black dark:border-white">Search results for {`"`}<span className='text-pink-500'>{params}</span>{`"`}</h1>

      {
        searchProducts.length < 1 && searchPages.length < 1 ? (
          <p className="p-4">No results found</p>
        ) 
        : (
          <div className="max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {
                searchProducts?.map(product => (
                  <ProductCard key={product.node.id} product={product} />
                ))
              }
            </div>
          </div>
        )
      }
      {/* <h3 className="text-3xl mt-3">Related Search</h3> */}
    </div>
  )
}