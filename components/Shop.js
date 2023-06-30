import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { getProductsInCollection } from "@/lib/Shopify"
import Link from "next/link";

const Shop = ({ categories }) => {
    console.log("categories::", categories);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        // Call a function or perform an action based on the selected category
        console.log("selectedCategory:: ", selectedCategory);
        const products = await getProductsInCollection(category.node.handle);
        setProducts(products);
    };

    useEffect(() => {
        handleCategoryClick(categories[0]);
    }, [selectedCategory]);

    return (
        <div className="w-full mx-auto pb-10 flex">
            <div className="flex flex-col justify-start items-start w-1/4 px-4">
            <h2 className="text-2xl md:text-5xl lg:text-5xl p-4 mb-4">Categories</h2>
                <ul className="list-none px-4">
                    {
                        categories?.map((category, i) => {
                            return (
                                <li key={i} className="mb-1" onClick={() => handleCategoryClick(category)}>
                                    <Link className="text-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white text-2xl" href="#">{category.node.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="flex flex-col justify-start items-start w-3/4 px-4">
                <h1 className="text-2xl md:text-5xl lg:text-5xl p-4 mb-4">Shop</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        products?.map(product => (
                            <ProductCard key={product.node.id} product={product} />
                        ))
                    }
                </div>
            </div>

            
        </div>
    )
  }
  
export default Shop;