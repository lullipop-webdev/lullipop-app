
import React, { createContext, useState, useContext, useEffect } from 'react'
import { getCustomerAddresses, getCustomerDefaultAddress, customerAddressCreate, markAsCustomerDefaultAddress, customerAddressUpdate } from '@/lib/Shopify';
import Router from 'next/router'

const AddressContext = createContext({});

export const AddressProvider = ({ children }) => {

    const [addresses, setAddresses] = useState(null)
    const [defaultAddress, setDefaultAddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [addressId, setAddressId] = useState('')

    useEffect(() => {
        
        
        async function fetchAddresses() {
            const accessToken = localStorage.getItem('accessToken')

            const response = await getCustomerAddresses(accessToken)

            setAddresses(response);
            console.log(addresses)
            if(response) {
                const response2 = await getCustomerDefaultAddress(accessToken)
                setDefaultAddress(response2);
            }
        }
        
        fetchAddresses()
    }, [])


    const createAddress = async (address1, address2, city, country, province, zip, enabled) => {
        try {
            if (typeof window !== 'undefined') {
                const accessToken = localStorage.getItem('accessToken');
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

    const editAddress = async (enabled, address1, address2, city, country, province, zip, addressId) => {
            if (typeof window !== 'undefined') {
                let accessToken = localStorage.getItem('accessToken');
                
                const response = await customerAddressUpdate(address1, address2, city, country, province, zip, accessToken, addressId)
                
                console.log(response);

                if(response) {
                    if(enabled) {
                        const response2 = await markAsCustomerDefaultAddress(addressId, accessToken);
                        console.log(response2)
                    }

                    if(response.data.customerAddressUpdate.customerAddress) {
                        setError(false);
                        setSuccess("Address updated")
                        Router.reload(window.location.pathname)
                    }    
    
                    if(response.data?.customerAdressUpdate?.customerUserErrors) {
                        setSuccess(false);
                        setError(response.data.customerCreate.customerUserErrors[0].message)
                    } 
                    
                }
            }
    }

    return (
        <AddressContext.Provider value={{ addresses, defaultAddress, error, success, createAddress, editAddress, loading }}>
            {children}
        </AddressContext.Provider>
    )
}



export const useAddressContext = () => useContext(AddressContext)


