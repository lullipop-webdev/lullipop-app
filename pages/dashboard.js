import Dashboard from '../components/Dashboard'
import Image from 'next/image'
import Greenroom from '../assets/LavBottomBack_720x1080__44332.png'

export default function dashboard() {

    return(
        <div>
            <Dashboard>
            <div className='flex flex-row flex-wrap items-start justify-around'>


                        <div className="max-w-md overflow-hidden shadow-xs bg-white dark:bg-black">
                            <Image className="w-full" src="https://storage.googleapis.com/lullipop-image-dump/003%20Petra%20Photo%20Shoots/Lullipop_Jeans/JEZ_1642.jpg" width="200" height="150" alt="Sunset in the mountains" />
                            <div className="px-6 py-4 flex flex-col justify-center items-center">
                                <div className="font-bold text-xl text-black dark:text-white mb-2">LULLIPOP MUST-HAVES</div>
                                <p className="text-black dark:text-white text-center">
                               Youll surely love every lullipop must-have we have chosen for you
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2 flex justify-center items-center">
                                <span className="inline-block bg-pink-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">SHOP NOW</span>
                            </div>
                        </div>
                        <div className="max-w-md overflow-hidden shadow-xs bg-white dark:bg-black">
                            <Image className='w-full' src="https://storage.googleapis.com/lullipop-image-dump/003%20Petra%20Photo%20Shoots/Lullipop_Jeans/JEZ_1642.jpg" width="200" height="150" alt="Sunset in the mountains" />
                            <div className="px-6 py-4 flex flex-col justify-center items-center">
                                <div className="font-bold text-xl text-black dark:text-white mb-2">FIND YOUR PERFECT FIT</div>
                                <p className="text-black dark:text-white text-center">
                               Visit our GREENROOM and learn how to find the perfect size for you
                                </p>
                            </div>
                        </div>
            </div>
            </Dashboard>
        </div>
    )
    
}
