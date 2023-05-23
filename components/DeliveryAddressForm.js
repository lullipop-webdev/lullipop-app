import { useState, useEffect } from "react";
import { customerAddressCreate, markAsCustomerDefaultAddress } from "../lib/Shopify";
import Modal from "./Modal";
import { Switch } from '@headlessui/react'
import Router from 'next/router'


export default function DeliveryAddressForm({accessToken}) {

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');

    const [country, setCountry] = useState('United States');
    const [province, setProvince] = useState(''); 
    const [zip, setZip] = useState('');
    const [enabled, setEnabled] = useState(true);

    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    let token;

    let linkNeeded = false;
    let heading = "Sign Up Success"
    const message = <p className="text-sm text-gray-500">Address successfully added</p> 

    function closeModal() {
        setIsOpen(false);
    }
    
    const onToggle = () => {setToggle((prev) => !prev)};


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeof window !== 'undefined') {
                accessToken = localStorage.getItem('accessToken');
                const response = await customerAddressCreate(address1, address2, city, country, province, zip, accessToken);
                console.log(response);

                if(response) {
                    if(enabled) {
                        const response2 = await markAsCustomerDefaultAddress(response.data.customerAddressCreate.customerAddress.id, accessToken);
                        console.log(response2)
                    }

                    if(response.data.customerAddressCreate.customerAddress !== null) {
                        setIsOpen(true);
                        setError(false);
                        Router.reload(window.location.pathname)
                    }    
    
                    if(response.data.customerAddressCreate.customerUserErrors) {
                        setError(response.data.customerCreate.customerUserErrors[0].message)
                    } 
                    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (    
        <div className="bg-white dark:bg-black w-full max-w-xl">
            <Modal open={isOpen} closeModal={closeModal} heading={heading} message={message}/>

            <form onSubmit={e => handleOnSubmit(e)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-first-name">
                        Address 1
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name="address1" onChange={e => setAddress1(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-last-name">
                        Address 2
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" name="address2" onChange={e => setAddress2(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-email">
                        City
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="" name="city" onChange={e => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-password">
                        Province/State
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="" name="province" onChange={e => setProvince(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-password">
                        Zip
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="" name="zip" onChange={e => setZip(e.target.value)} />
                    </div>
                </div>  
                <p className="text-red-500 text-xs italic">{error}</p>

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
    )
}