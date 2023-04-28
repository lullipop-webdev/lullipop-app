import { getCustomerOrders } from '@/lib/Shopify'
import Dashboard from '@/components/Dashboard'
import AccountDetailsForm from '../components/AccountDetailsForm'

export default function accountsettings() {
    
    
    return (
        <Dashboard>
        <div className='flex flex-col items-start justify-start'>
            <div className='mb-6'>
                <h1>Account Settings</h1>
            </div>
            <AccountDetailsForm />
        </div>
        </Dashboard>
    )
}