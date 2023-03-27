import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import Dashboard from '@/components/Dashboard'
import DeliveryAddressForm from '@/components/DeliveryAddressForm'
import { getCustomerAddresses, getCustomerDefaultAddress } from '@/lib/Shopify'
import { AiOutlineCheckCircle } from 'react-icons/ai'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function DeliveryAddress() {

    const [data, setData] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(null);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');

      getCustomerAddresses(accessToken).then((data) => {
          setData(data)
      })

      getCustomerDefaultAddress(accessToken).then((data) => {
        setDefaultAddress(data.id);
      })
      

      // getCustomerOrders(accessToken).then((data) => {
      //     setCustomerOrders(data)
      // })
    
    }, [data])
      return (
        <Dashboard>
          <div className="w-full max-w-xl py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20">
                
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    My Saved Addresses
                  </Tab>
                  <Tab
                    
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    Add Shipping Address
                  </Tab>

              </Tab.List>
              <Tab.Panels className="mt-2">
                
                  <Tab.Panel
                    className={classNames(
                      'rounded-xl bg-white dark:bg-black',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    <ul>
                        {defaultAddress && data && data.map((address) => (
                          <li
                          key={address.id}
                          className="relative rounded-md hover:bg-pink-400 flex flex-row justify-between text-black dark:text-white mb-3 h-8"
                          >
                            <h3 className="text-sm font-medium leading-5 w-full">
                              {address.formatted}
                            </h3>

                            {address.id.slice(28,41) === defaultAddress.slice(28,41) &&
                              <AiOutlineCheckCircle />
                            }
                            {/* <button className="shadow focus:shadow-outline focus:outline-none font-bold px-4 rounded">
                              Edit Address
                            </button> */}
                        </li>
                        ))}
                        
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel
                    className={classNames(
                      'rounded-sm bg-white',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2'
                    )}
                  >
                    <DeliveryAddressForm /> 
                  </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </Dashboard>
      )
}