import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import Dashboard from '@/components/Dashboard'
import EditAddressForm from '@/components/EditAddressForm'
import DeliveryAddressForm from '@/components/DeliveryAddressForm'
import { getCustomerAddresses, getCustomerDefaultAddress } from '@/lib/Shopify'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useAddressContext } from '../context/AddressContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function DeliveryAddress() {

    const {addresses, defaultAddress} = useAddressContext();

    const [isOpen, setIsOpen] = useState(false);
    const [addressId, setAddressId] = useState('')
    const [selected, setSelected] = useState()

    
    
    function closeModal() {
      setIsOpen(false);
    }
    
    function openModal() {
      setIsOpen(true)
    }


      return (
        <Dashboard>
          
          <EditAddressForm open={isOpen} closeModal={closeModal} addresses={addresses}  addressId={addressId}/>
          <div className="w-full max-w-xl py-6 sm:px-0">
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
                      'focus:outline-none'
                    )}
                  >
                    <ul>
                        {defaultAddress && addresses && addresses.map((address) => (
                          <li
                          key={address.id.slice(29,41)}
                          className="relative rounded-md flex flex-row justify-evenly text-black dark:text-white mb-3 h-14 px-4 py-3"
                          >
                            
                            <h3 className="text-sm font-medium leading-5 w-full">
                              {address.formatted}
                            </h3>

                            {address.id.slice(28,41) === defaultAddress.id.slice(28,41) &&
                              <AiOutlineCheckCircle size={"lg"} />
                            }
                            
                            <div className="w-52">
                              <button className="shadow bg-pink-400 focus:shadow-outline focus:outline-none text-white rounded px-2" onClick={e =>  {setAddressId(address.id); openModal()}}>
                                  Edit Address
                              </button>
                            </div>

                            
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