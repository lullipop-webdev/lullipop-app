import { useState } from "react";
import { customerCreate } from "../lib/Shopify";
import Modal from "./Modal";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
    // const [values, setValues] = useState({
    //     email: '',
    //     password: ''
    // })

    // const handleOnChange = event => {
    //     const { name, value } = event.target;
    //     setValues({ ...values, [name]: value });
    // };
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [marketing, setMarketing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {setMarketing((prev) => !prev)};
    let linkNeeded = true;
    let heading = "Sign Up Success"
    
    function closeModal() {
        setIsOpen(false);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
            if(password === '' || email === '' || firstName === '') {
                setError("Required fields are empty");
            } else if(!regexp.test(password)) {
                setError("Password must contain at least one numeric character, one capital letter and a minimum of 8 characters.");
            } else if(confirmPassword !== password) {
                setError("Confirm password does not match password field");
            } else {
                const response = await customerCreate(email, password, firstName, lastName, marketing);
                console.log(response);
                if(response) {
                    if(response.data.customerCreate.customer !== null) {
                        setIsOpen(true);
                        setError(false);
                        setTimeout(() => {
                            login(email, password)
                        }, "3000");
                        
                    }    
    
                    if(response.data.customerCreate.customerUserErrors) {
                        setError(response.data.customerCreate.customerUserErrors[0].message)
                    } 
                    
                }
            }

            // if(confirmPassword === password) {
            //     const response = await customerCreate(email, password, firstName, lastName, marketing);
            //     console.log(response);
            //     if(response) {
            //         if(response.data.customerCreate.customer !== null) {
            //             setIsOpen(true);
            //             setError(false);
            //             setTimeout(() => {
            //                 login(email, password)
            //             }, "3000");
                        
            //         }    
    
            //         if(response.data.customerCreate.customerUserErrors) {
            //             setError(response.data.customerCreate.customerUserErrors[0].message)
            //         } 
                    
            //     }
            // } else {
            //     setError("Password and Confirm Password fields do not match.")
            // }
        } catch (error) {
            console.log(error);
        }
    }
    return (    
        <div className="bg-white dark:bg-black w-full max-w-lg">
            <Modal open={isOpen} closeModal={closeModal} heading={heading} linkNeeded={linkNeeded} />
            <form onSubmit={e => handleOnSubmit(e)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-first-name">
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" name="first_name" onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-last-name">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" name="last_name" onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-email">
                        Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="jane@doe.com" name="email" onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-password">
                        Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" name="password" onChange={e => setPassword(e.target.value)} />
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as youd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml="grid-password">
                        Confirm Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-confirm-password" type="password" placeholder="******************" name="confirm_password" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                <p className="text-red-500 text-xs italic">{error}</p>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold"> 
                    <input className="mr-2 leading-tight" type="checkbox" onChange={onToggle} ischecked={marketing} />
                    <span className="text-sm">
                        Send me your newsletter!
                    </span>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <button className="shadow bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Sign Up
                    </button>
                    </div>
                </div>
            </form>
        </div>
    )
}