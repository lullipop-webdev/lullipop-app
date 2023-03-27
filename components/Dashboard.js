import { useEffect, useState } from 'react';
import { getCustomerDetails,getCustomerOrders } from '../lib/Shopify';

import Sidebar from './Sidebar' 

export default function Dashboard({children}) {

    const [data, setData] = useState(null);
    // const [customerOrders, setCustomerOrders] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        getCustomerDetails(accessToken).then((data) => {
            setData(data)
        })

        // getCustomerOrders(accessToken).then((data) => {
        //     setCustomerOrders(data)
        // })
        
    }, [])

    return (
        <div className="h-screen flex flex-row justify-start mx-12 xl:ml-64">
            <Sidebar customer={data} />
            <div className="bg-primary flex-1 p-4 text-white">
                {children}
            </div>
        </div>
    )
    
}