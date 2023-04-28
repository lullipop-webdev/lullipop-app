import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {customerAddressUpdate, getCustomerAddresses, markAsCustomerDefaultAddress} from '../lib/Shopify'
import { Switch } from '@headlessui/react'


export default function EditAddressForm({open, closeModal, addresses, addressId}) {

    useEffect(() => {
        const selectedAddress = addresses?.filter(address => address.id.slice(29,42) === addressId.slice(29,42))
        console.log(selectedAddress)

        if(selectedAddress || selectedAddress?.length > 0) {
            setAddress1(selectedAddress[0]?.address1)
            setAddress2(selectedAddress[0]?.address2)
            setCity(selectedAddress[0]?.city)
            setCountry(selectedAddress[0]?.country)
            setProvince(selectedAddress[0]?.province)
            setZip(selectedAddress[0]?.zip)
        }
    }, [addressId, addresses])

    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();

    const [country, setCountry] = useState();
    const [province, setProvince] = useState(); 
    const [zip, setZip] = useState();

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [data, setData] = useState(null);
    const [enabled, setEnabled] = useState(true);
    

    const onToggle = () => {setToggle((prev) => !prev)};


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeof window !== 'undefined') {
                let accessToken = localStorage.getItem('accessToken');
                
                const response = await customerAddressUpdate(address1, address2, city, country, province, zip, accessToken, addressId)
                
                console.log(response);

                if(response) {
                    if(enabled) {
                        const response2 = await markAsCustomerDefaultAddress(addressId, accessToken);
                        console.log(response2)
                    }

                    if(response.data.customerAddressUpdate.customerAddress !== null) {
                        setError(false);
                        setSuccess("Address updated")
                    }    
    
                    if(response.data.customerAdressUpdate.customerUserErrors) {
                        setSuccess(false);
                        setError(response.data.customerCreate.customerUserErrors[0].message)
                    } 
                    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <Dialog open={open} as="div" className="relative z-10" onClose={closeModal}>
          
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
             
                <Dialog.Panel className="dark:bg-gray-800 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Edit Address
                  </Dialog.Title>
                  <div className="mt-2">

                  <form onSubmit={e => handleOnSubmit(e)}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" forhtml="grid-first-name">
                                Address 1
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" value={address1} name="address1" onChange={e => setAddress1(e.target.value)}/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" forhtml="grid-last-name">
                                Address 2
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 dark:text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" name="address2" value={address2} onChange={e => setAddress2(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" forhtml="grid-email">
                                City
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="" name="city" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" forhtml="grid-password">
                                Province/State
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="" name="province" value={province} onChange={e => setProvince(e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" forhtml="grid-password">
                                Zip
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="" name="zip" value={zip} onChange={e => setZip(e.target.value)} />
                            </div>
                        </div>
                        <p className="text-red-500 text-md italic">{error}</p>
                        <p className="text-green-500 text-md italic">{success}</p>
                        <div className="md:flex md:items-center mb-6">
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${enabled ? 'bg-pink-800' : 'bg-pink-400'}
                                relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Mark as Default Address</span>
                                <span
                                aria-hidden="true"
                                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <span className="ml-6">Mark as Default Address</span>
                        </div>
                        
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                            <button className="shadow bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Save Address
                            </button>
                            </div>
                        </div>
                    </form>
                   
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                    Close
                    </button>
                  </div>
                </Dialog.Panel>
            </div>
          </div>
        </Dialog>
    </>
  )
}
