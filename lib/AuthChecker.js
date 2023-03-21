import {getCustomerDetails} from './Shopify';

import { useState } from 'react';

export async function AuthChecker(accessToken) {
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        getCustomerDetails(accessToken).then((data) => {
            setData(data)
        })

        if(data.length > 0) {
            setIsAuth(true)
        }

    }, [])

    return isAuth;
}