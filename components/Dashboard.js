import  { useRouter } from 'next/router';

import Sidebar from './Sidebar' 
import { useAuth, ProtectRoute } from '@/context/AuthContext';

export default function Dashboard({children}) {
    const router = useRouter();
    const {user, isAuthenticated} = useAuth();

    return (
        <ProtectRoute>
            <div className=" min-h-fit flex flex-row justify-start mx-2 xl:ml-32 ">
                <Sidebar customer={user} />
                <div className="bg-primary flex-1 p-4 text-white">
                    {children}
                </div>
            </div>
        </ProtectRoute>
    )
}