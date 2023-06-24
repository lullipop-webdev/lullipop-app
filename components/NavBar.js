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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  let cartQuantity = 0
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
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
          {/* <div onClick={handleNav} className='block sm:z-10'>
            {nav ? (
              <AiOutlineClose size={20}/>
            ) : (
              <AiOutlineMenu size={20}  />
            )}
          </div>   */}

          <div className="relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all duration-200" onClick={handleNav}>
            <div className="flex flex-col justify-evenly w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className={`bg-pink-500 h-[2px] w-7 transform transition-all duration-300 origin-left ${nav ? 'rotate-[42deg] -translate-x-[0px] -translate-y-[4px]' : ''}`}></div> 
              <div className={`bg-pink-500 h-[2px] w-1/2 rounded transform transition-all duration-300 ${nav ? 'w-7 -rotate-[42deg] -translate-x-[5px] -translate-y-[2px]' : 'ml-auto'}`}></div>
            </div>
          </div>
        </div>
        <div className='lg:hidden w-1/2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" onClick={() => handleSearchOpen() }>
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <Transition.Root show={isSearchOpen} as={Fragment}>
            <Transition.Child
              as={Fragment}
              enter="transition-translate ease-linear duration-100"
              enterFrom="-translate-y-24"
              enterTo="translate-y-0"
              leave="transition-translate ease-linear duration-100"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-24"
            >
              <div className={`absolute p-4 w-full bg-white dark:bg-black top-0 left-0 z-10`}>
                <div className='p-4 h-[90px] flex justify-between'>
                  <div className="border border-pink-500 rounded-full w-full p-2 flex items-center">
                    <input
                      type="text"
                      className="flex-grow border-none outline-none text-lg px-2 text-dark-500 dark:text-white"
                      style={{
                        backgroundColor: 'transparent'
                      }}
                      placeholder="Search"
                    />
                    <button className="text-dark-500 dark:text-white rounded-md py-2 px-4 ml-2">
                      {/* <FiChevronRight /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </button>
                  </div>
                  <div className='text-pink-500 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleSearchOpen()} width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Transition.Root>
         
        </div>
        <div className='items-left p-4 w-1/2 hidden lg:flex'>
          <div className="border border-pink-500 rounded-full p-2 flex items-center">
            <input
              type="text"
              className="flex-grow border-none outline-none text-lg px-2 text-dark-500 dark:text-white"
              style={{
                backgroundColor: 'transparent'
              }}
              placeholder="Search"
            />
            <button className="text-dark-500 dark:text-white rounded-md py-2 px-4 ml-2">
              {/* <FiChevronRight /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </button>
          </div>
        </div>
        {/* <div className="h-full flex px-32 min-w-full lg:min-w-[500px] lg:visible sm:invisible">
              <input type="text" placeholder='Search' style={{backgroundColor: (determiner) ? `${color}` : `none`}} className="bg-white dark:bg-black text-pink-400 border-2 border-pink-400 rounded-2xl px-8" />
        </div> */}
        <div className='max-w-[1240px] flex items-center'>
          <div className='flex flex-row space-x-5'>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
                {/* <Image src={AccountIcon} alt="Lullipop" width={30} height={30}/> */}
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
                            active ? 'bg-pink-400 text-white' : 'text-gray-900'
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
              className="text-md font-bold cursor-pointer relative"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
              </svg>
              {/* <HiShoppingBag size="2rem" /> */}
              <span className='absolute top-0 -right-3 font-normal text-sm bg-pink-500 text-white w-[20px] h-[20px] text-center rounded-full'>{cartQuantity}</span>
            </Link>
            
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
                    {/* <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setNav(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 focus-outline-none hover:text-pink-500 transtion duration-300 ease-in-out" aria-hidden="true" />
                    </button> */}

                    <div className="relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all duration-200" onClick={handleNav}>
                      <div className="group flex flex-col justify-evenly w-[15px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden">
                        <div className={`group-hover:bg-pink-500 bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${nav ? 'rotate-[42deg] -translate-x-[0px] -translate-y-[4px]' : ''}`}></div> 
                        <div className={`group-hover:bg-pink-500 bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 ${nav ? 'w-7 -rotate-[42deg] -translate-x-[4px] -translate-y-[5px]' : 'ml-auto'}`}></div>
                      </div>
                    </div>
                  </div>

                  <Dialog.Panel className="pt-6">
                    <ul className='px-6'>
                      <li onClick={handleNav} className='focus:outline-none p-2 text-xl mb-1 transition duration-300 ease-in-out hover:bg-pink-500 rounded-lg hover:text-white text-black flex w-full justify-between cursor-pointer items-center'>
                        <Link className='w-full' href='/'>Lullipop</Link>
                      </li>
                      <li onClick={handleNav} className='focus:outline-none p-2 text-xl mb-1 transition duration-300 ease-in-out hover:bg-pink-500 rounded-lg hover:text-white text-black flex w-full justify-between cursor-pointer items-center'>
                        <Link className='w-full' href='/shop'>Shop</Link>
                      </li>
                      <li onClick={handleNav} className='focus:outline-none p-2 text-xl mb-1 transition duration-300 ease-in-out hover:bg-pink-500 rounded-lg hover:text-white text-black flex w-full justify-between cursor-pointer items-center'>
                        <Link className='w-full' href='/work'>Lullifit</Link>
                      </li>       
                      <li onClick={handleNav} className='focus:outline-none p-2 text-xl mb-1 transition duration-300 ease-in-out hover:bg-pink-500 rounded-lg hover:text-white text-black flex w-full justify-between cursor-pointer items-center'>
                        <Link className='w-full' href='/cart'>Cart</Link>
                        <div className="py-1 px-3 bg-pink-500 rounded text-white flex items-center justify-center text-xs">{cartQuantity}</div>
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
