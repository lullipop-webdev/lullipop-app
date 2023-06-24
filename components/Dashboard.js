import { useEffect, useState } from 'react';
import { getCustomerDetails,getCustomerOrders } from '../lib/Shopify';
import { AuthChecker } from '../lib/AuthChecker';
import { redirect } from 'next/navigation'

export default function Dashboard() {

    const [data, setData] = useState(null);
    const [customerOrders, setCustomerOrders] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        getCustomerDetails(accessToken).then((data) => {
            setData(data)
        })

        getCustomerOrders(accessToken).then((data) => {
            setCustomerOrders(data)
        })
        
    }, [])

    console.log(customerOrders)
    return (
        <div className="bg-white dark:bg-black">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="mt-12 text-2xl font-extrabold text-black dark:text-white mb-6">
                Your Orders {data?.email}
            </h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {/* {
                products?.map(product => (
                    <ProductCard key={product.node.id} product={product} />
                ))
                
                } */}
                
                {
                    (customerOrders !== null) ? customerOrders[0].node.lineItems.edges.map((order) => {
                        <h1>{order.node.title}</h1>
                    }) : console.log("false")
                }
                
    
            </div>
            </div>
        </div>
    )
    
}