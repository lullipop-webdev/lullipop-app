import Link from 'next/link';
import React, { Fragment, useState, useEffect, useContext } from 'react';
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
import { FiChevronRight, FiSearch, FiShoppingCart } from 'react-icons/fi';


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
      <div className='flex justify-between items-center p-4 text-pink-400 xs:justify-start hidden'>
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
        <div className='flex items-left p-4 w-1/2'>
          <div className="border border-pink-500 rounded-full p-2 items-center lg:flex">
            <input
              type="text"
              className="flex-grow border-none outline-none text-lg px-2 text-dark-500 dark:text-white"
              style={{
                backgroundColor: 'transparent'
              }}
              placeholder="Search"
            />
            <button className="text-dark-500 dark:text-white rounded-md py-2 px-4 ml-2">
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className='flex items-left p-4'>
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
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                         {!isAuthenticated ? <Link href='/login'>Login</Link> : <Link href='/dashboard'>Dashboard</Link>}
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          
                          {!isAuthenticated ? <Link href='/signup'>Sign Up</Link> : <Link href='/' onClick={logout}>Logout</Link>}
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                </Menu.Items>
              </Transition>
            </Menu>
            <a 
              className="text-md font-bold cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <HiShoppingBag size="2rem" />
              
            </a>
            ({cartQuantity})
            {renderThemeChanger()}
            <MiniCart cart={cart} />
          </div>
        </div>
        
        
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white dark:bg-black text-center ease-in duration-300'
              : 'absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white dark:bg-black text-center ease-in duration-300'
          }
        >
          <ul>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/'>Lullipop</Link>
            </li>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/products'>Shop</Link>
            </li>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/work'>Lullifit</Link>
            </li>            
          </ul>
        </div>
      </div>

      <nav style={{backgroundColor: (determiner) ? `transparent` : `none` }} className="bg-white border-gray-200 dark:bg-black ease-in duration-300 p-4">
        <div className="flex flex-wrap items-center justify-between p-4 text-pink-400">
          <Link href='/' className='flex items-center'>
            <Image src={LulliLogo} alt="Lullipop" width={160} height={90}/>
          </Link>

          <div className="flex md:order-2">
            <div className="relative hidden lg:block">
              <div className="border border-pink-500 rounded-full p-2 items-center hidden lg:flex">
                <input
                  type="text"
                  className="flex-grow border-none outline-none text-lg px-2 text-dark-500 dark:text-white"
                  style={{
                    backgroundColor: 'transparent'
                  }}
                  placeholder="Search"
                  aria-hidden="true"
                />
                <button className="text-dark-500 dark:text-white rounded-md py-2 px-4 ml-2">
                  <FiSearch />
                </button>
              </div>
            </div>
          </div>

          <div className="flex md:order-2 flex-row space-x-5">
            <Link href='#' className='flex items-center cursor-pointer relative' onClick={() => setCartOpen(!cartOpen)}>
              <FiShoppingCart size="1.5rem" />
              <span className="inline-flex items-center justify-center absolute top-0 right-0 w-4 h-4 bg-red-500 text-xs rounded-full text-white">
                {cartQuantity}
              </span>
            </Link>
            {renderThemeChanger()}
            <div onClick={handleNav} className='z-10 inline-flex items-center ease-in duration-300'>
              {nav ? (
                <AiOutlineClose size={20}/>
              ) : (
                <AiOutlineMenu size={20}  />
              )}
            </div> 
          </div>

        <div
          className={
            nav
              ? 'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white dark:bg-black text-center ease-in duration-300'
              : 'absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white dark:bg-black text-center ease-in duration-300'
          }
        >
          <ul>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/'>Lullipop</Link>
            </li>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/products'>Shop</Link>
            </li>
            <li onClick={handleNav} className='p-2 text-2xl hover:text-gray-500'>
              <Link href='/work'>Lullifit</Link>
            </li>            
          </ul>
        </div>


        </div>
      </nav>
    </div>
  );
};

