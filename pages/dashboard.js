import Dashboard from '../components/Dashboard'
import { getCustomerDetails } from '../lib/Shopify'
import { useState, useEffect } from 'react'
import { getCollections } from '../lib/Shopify'

export default function dashboard() {
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        getCollections().then((data) => {
            setCollections(data);
        })
    }, [])

    console.log(collections);
    return(
        <div>
            <Dashboard>
            <div className='flex flex-col items-start justify-start'>
                {collections && collections.map((collection) => {
                    return (
                        <div key={collection.node.id} className="max-w-sm w-full lg:max-w-full lg:flex my-6">
                                <div style={{backgroundImage: `url(${collection.node.image.url})`}}  className={`h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}  title="Woman holding a mug">
                                </div>
                                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div className="mb-8">
                                        <p className="text-sm text-gray-600 flex items-center">
                                             {collection.node.title}
                                        </p>
                                        <div className="text-gray-900 font-bold text-xl mb-2">{collection.node.title}</div>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            {collection.node.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                    
                                    {/* <div className="text-sm">
                                        <p className="text-gray-900 leading-none">Variant: {item.node.variant.title}</p>
                                        <p className="text-gray-600">Order Date: {order.processedAt.slice(0, 10)}</p>
                                    </div> */}
                                    </div>
                                </div> 
                        </div>  
                    )
                })}
            </div>
            </Dashboard>
        </div>
    )
    
}
