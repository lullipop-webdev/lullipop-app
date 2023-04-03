import { useState } from "react";
import { customerRecover } from "../lib/Shopify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Modal from "./Modal";

export default function ForgotPasswordForm() {
    const { push } = useRouter();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    
    let linkNeeded = false;
    let heading = "Forgot Password"
    const message = <p className="text-sm text-gray-500">A password reset url was sent to your email.</p> 

    function closeModal() {
        setIsOpen(false);
    }

    const {isAuthenticated} = useAuth();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customerRecover(email);

            console.log(response)

            if(response) {
                if(response.data.customerRecover.customerUserErrors.length < 1) {
                    setIsOpen(true);
                    setError(false);
                    setEmail("");
                }    

                if(response.data.customerRecover.customerUserErrors.length > 0) {
                    setError(response.data.customerRecover.customerUserErrors   [0].message)
                } 
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isAuthenticated) {
        push('/dashboard');
    } else {
        return (
            <div className="w-full max-w-xs">
                <Modal open={isOpen} closeModal={closeModal} heading={heading} message={message}/>
                <form className="bg-white dark:bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center" onSubmit={e => handleOnSubmit(e)}>
                    <div className="mb-4 xl:w-96">
                    <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="jane@doe.com" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <p className="text-red-500 text-xs italic">{error}</p>
                    <div className="flex items-center justify-between">
                        <button className="bg-pink-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Send recovery email
                        </button>
                        
                    </div>
                </form>
                {/* <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p> */}
            </div>
        )
    }
        
}