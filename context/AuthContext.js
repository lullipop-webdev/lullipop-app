
import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { getCustomerDetails, customerAccessTokenCreate } from '@/lib/Shopify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const protectedPaths = ['/dashboard', '/deliveryaddress']
    useEffect(() => {
        async function fetchProfile() {
            const accessToken = localStorage.getItem('accessToken')
            const response = await getCustomerDetails(accessToken);
            console.log(response)
           
            
            if (response.length > 0 || response !== null) {
                setUser(response);
                setLoading(false);
            } 
            
            if (response.length < 1 || response === null) {
                console.log("no user")
                setUser(null)
                if(protectedPaths.includes(window.location.pathname.toString())) {
                    Router.push('/login')
                }
            }
        }
        fetchProfile()
    }, [])

    const login = async (email, password) => {
        const response = await customerAccessTokenCreate(email, password);

        if(response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
            setError(response.data.customerAccessTokenCreate.customerUserErrors[0].message)
        } else {
            localStorage.setItem('accessToken', response.data.customerAccessTokenCreate.customerAccessToken.accessToken);
            const user = await getCustomerDetails(response.data.customerAccessTokenCreate.customerAccessToken.accessToken)

            if (response.length > 0 || response !== null) {
                setUser(user);
                setLoading(false);
                console.log("Got user", user)
                Router.push('/dashboard')
            } 
            
            if (response.length < 1 || response === null) {
                console.log("no user")
                setUser(null)
                Router.push('/login')
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        setUser(null)
        Router.push('/');
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, error, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const loader = <h1>Loading...</h1>
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading || (!isAuthenticated)){
      return loader; 
    }
    return children;
};