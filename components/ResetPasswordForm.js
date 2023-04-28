import { useState } from "react";
import { resetCustomerPasswordByUrl } from "../lib/Shopify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Modal from "./Modal";

export default function ResetPasswordForm() {
    const { push, query } = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    
    let linkNeeded = false;
    let heading = "Reset your password"
    const message = <p className="text-sm text-gray-500">Your password is now reset</p> 

    function closeModal() {
        setIsOpen(false);
    }

    const {isAuthenticated, login} = useAuth();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {

                setError("Confirm password does not match")

            } else {

                const response = await resetCustomerPasswordByUrl(password, query.reset_url);

                console.log(response)

                if(response) {
                    if(response.data.customerResetByUrl.customerUserErrors.length < 1) {
                        setIsOpen(true);
                        setError(false);
                        login(response.data.customerResetByUrl.customer.email, password)
                    }    

                    if(response.data.customerRecover.customerUserErrors.length > 0) {
                        setError(response.data.customerRecover.customerUserErrors[0].message)
                        setPassword("")
                        setConfirmPassword("")
                    } 
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
                <form className="bg-white dark:bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center" onSubmit={e => handleOnSubmit(e)}>
                    <div className="mb-4 xl:w-96">
                    <label className="block text-white text-sm font-bold mb-2" forhtml="username">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="************" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4 xl:w-96">
                    <label className="block text-white text-sm font-bold mb-2" forhtml="username">
                        Confirm Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="************" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <p className="text-red-500 text-xs italic">{error}</p>
                    <div className="flex items-center justify-between">
                        <button className="bg-pink-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Reset Password
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