import { useState } from "react";
import { customerAccessTokenCreate } from "../lib/Shopify";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customerAccessTokenCreate(email, password);
            console.log(response);
            localStorage.setItem('accessToken', response.data.customerAccessTokenCreate.customerAccessToken.accessToken);

            if(response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
                setError(response.data.customerAccessTokenCreate.customerUserErrors[0].message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white dark:bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => handleOnSubmit(e)}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="username">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="jane@doe.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="password">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={e => setPassword(e.target.value)} />
                <p className="text-red-500 text-xs italic">{error}</p>
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-pink-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-pink-400" href="#">
                    Forgot Password?
                </a>
                </div>
            </form>
            {/* <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p> */}
        </div>
    )
}