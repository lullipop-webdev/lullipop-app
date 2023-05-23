import { useState, useEffect } from 'react'
import { getCustomerOrders } from '@/lib/Shopify'
import Dashboard from '@/components/Dashboard'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { formatter } from '../utlis/helpers'
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';



export default function orderhistory() {
    const [customerOrders, setCustomerOrders] = useState(null)
    const [color, setColor] = useState('transparent');

    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        getCustomerOrders(accessToken).then((data) => {
            setCustomerOrders(data)
        })
    }, [])

    console.log(customerOrders);

    const pathname = router.pathname;
    let determiner = false;

    if(pathname === "/orderhistory") {
        determiner = true;
    }
    return (
        <Dashboard>
        <div className='flex flex-col items-start justify-start text-black dark:text-white'>
            <div className='mb-2'>
                <h1>ORDER HISTORY</h1>
            </div>
            <div className="h-full flex min-w-full lg:min-w-[500px] lg:visible sm:invisible">
              <input type="text" placeholder='Search Order' style={{backgroundColor: (determiner) ? `${color}` : `none`}} className="bg-white dark:bg-black text-pink-400 border-2 border-pink-400 rounded-2xl px-8" />
            </div> 
            {customerOrders && customerOrders.data.customer.orders.nodes.map((order) => {
                return (
                    <div key={order.orderNumber} className="max-w-sm w-full lg:max-w-full lg:flex my-6">
                        {order.lineItems.edges.map((item) => {
                            return (
                            <>
                            <div style={{backgroundImage: `url(${item.node.variant.image.url})`}}  className={`h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}  title="Woman holding a mug">
                            </div>
                            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        Order Number {order.orderNumber}
                                    </p>
                                    <div className="text-gray-900 font-bold text-xl mb-2">{item.node.title}</div>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        Quantity: {item.node.quantity}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        Status: {order.fulfillmentStatus}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        Amount: {formatter.format(item.node.discountedTotalPrice.amount)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">Variant: {item.node.variant.title}</p>
                                    <p className="text-gray-600">Order Date: {order.processedAt.slice(0, 10)}</p>
                                </div>
                                </div>
                            </div>
                            </>
                            )
                        })}
                    </div>  
                )
            })}
        </div>
        </Dashboard>
    )
}