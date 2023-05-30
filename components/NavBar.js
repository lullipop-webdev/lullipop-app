import Link from 'next/link';
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import { CartContext } from '../context/shopContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HiShoppingBag } from 'react-icons/hi'
import MiniCart from './MiniChart'
import { HiSun, HiMoon, HiUserCircle } from 'react-icons/hi';
import LulliLogo from '../assets/lulli-pink-logo.png'
import AccountIcon from '../assets/customer_acc_icons-03.png';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { Menu, Transition, Dialog, Disclosure } from '@headlessui/react'
import { useAuth } from '@/context/AuthContext';


function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');
  const [mounted, setMounted] = useState(false);
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)
  
  let cartQuantity = 0
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })

  const handleNav = () => {
    setNav(!nav);
  };

  const {systemTheme , theme, setTheme} = useTheme();

  const renderThemeChanger= () => {
    if(!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme ;

    if(currentTheme ==="dark"){
      return (
        <HiSun size="2rem" className="text-pink-400 " role="button" onClick={() => setTheme('light')} />
      )
    }

    else {
      return (
        <HiMoon size="2rem" className="text-pink-400 " role="button" onClick={() => setTheme('dark')} />
      )
    }
  };

  const {isAuthenticated , logout} = useAuth();
  
  useEffect(() =>{
    setMounted(true);
  },[isAuthenticated])

  

  const router = useRouter();

  const pathname = router.pathname;
  let determiner = false;

  if(pathname === "/") {
    determiner = true;
  }

  return (
    <div
      style={{backgroundColor: (determiner) ? `transparent` : `none`, position: (determiner) ? `fixed` : `static` }}
      className='bg-white dark:bg-black w-full z-10 ease-in duration-300'
    >
      <div className='flex justify-between items-center p-4 text-pink-400 xs:justify-start'>
        <div className='flex items-center p-4'>
          <Link href='/' className='mr-4'>
            
            <Image src={LulliLogo} alt="Lullipop" width={160} height={90}/>
          </Link>
          {/* Mobile Button */}
          <div onClick={handleNav} className='block sm:z-10'>
            {nav ? (
              <AiOutlineClose size={20}/>
            ) : (
              <AiOutlineMenu size={20}  />
            )}
          </div>  
        </div>
        {/* <div className="h-full flex px-32 min-w-full lg:min-w-[500px] lg:visible sm:invisible">
              <input type="text" placeholder='Search' style={{backgroundColor: (determiner) ? `${color}` : `none`}} className="bg-white dark:bg-black text-pink-400 border-2 border-pink-400 rounded-2xl px-8" />
        </div> */}
        <div className='max-w-[1240px] flex items-center'>
          <div className='flex flex-row space-x-5'>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button>
                <Image src={AccountIcon} alt="Lullipop" width={30} height={30}/>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute w-36 right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-pink-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                         {!isAuthenticated ? <Link href='/login'>Login</Link> : <Link href='/dashboard'>Dashboard</Link>}
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-pink-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          
                          {!isAuthenticated ? <Link href='/signup'>Sign Up</Link> : <Link href='/' onClick={logout}>Logout</Link>}
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                </Menu.Items>
              </Transition>
            </Menu>
            <Link 
              href="void:javascript(0)"
              className="text-md font-bold cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <HiShoppingBag size="2rem" />
              
            </Link>
            ({cartQuantity})
            {renderThemeChanger()}
            <MiniCart cart={cart} />
          </div>
        </div>
        
        
        {/* Mobile Menu */}

        <Transition.Root show={nav} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={setNav}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex ml-auto px-4">
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setNav(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 focus-outline-none" aria-hidden="true" />
                    </button>
                  </div>

                  <Dialog.Panel className="pt-6">
                    <ul className='px-6'>
                      <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
                        <Link href='/'>Lullipop</Link>
                      </li>
                      <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
                        <Link href='/shop'>Shop</Link>
                      </li>
                      <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
                        <Link href='/work'>Lullifit</Link>
                      </li>       
                      <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
                        <Link href='/cart'>Cart</Link>
                      </li>        
                    </ul>
                  </Dialog.Panel>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};
