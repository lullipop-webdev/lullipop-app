import { useState } from "react";
import { updateCustomerDetails } from "../lib/Shopify";
import Modal from "./Modal";
import { Switch } from '@headlessui/react'
import { useAuth } from '@/context/AuthContext';

export default function AccountDetailsForm() {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);

    const [acceptsMarketing, setAcceptsMarketing] = useState(user?.acceptsMarketing);
    const [phone, setPhone] = useState(user?.phone);

    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    

    const onToggle = () => {setAcceptsMarketing((prev) => !prev)};

    let accessToken;

    let linkNeeded = false;
    let heading = "Edit your details"
    const message = <p className="text-sm text-gray-500">Your Details has been successfully edited</p> 

    function closeModal() {
        setIsOpen(false);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeof window !== 'undefined') {
                accessToken = localStorage.getItem('accessToken');
                console.log(accessToken)
                const response = await updateCustomerDetails(acceptsMarketing, email, firstName, lastName, phone, accessToken);
                console.log(response);

                if(response) {

                    if(response.data.customerUpdate.customer !== null) {
                        setIsOpen(true);
                        setError(false);
                    }    
    
                    if(response.data.customerUpdate.customerUserErrors) {
                        setError(response.data.customerUpdate.customerUserErrors[0].message)
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
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" value={firstName} name="firstName" onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-last-name">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" value={lastName} name="lastName" onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-email">
                        Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-password">
                        Phone
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" type="text" placeholder="" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                </div>
                <p className="text-red-500 text-xs italic">{error}</p>

                <div className="md:flex md:items-center mb-6">
                    <Switch
                        checked={acceptsMarketing}
                        onChange={onToggle}
                        className={`${acceptsMarketing ? 'bg-pink-400' : 'bg-gray-200'}
                        relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span className="sr-only">Subscribe to our newsletter</span>
                        <span
                        aria-hidden="true"
                        className={`${acceptsMarketing ? 'translate-x-9' : 'translate-x-0'}
                            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                    <span className="ml-6">Subscribe to newsletter</span>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <button className="shadow bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Edit
                    </button>
                    </div>
                </div>
            </form>
        </div>
    )
}