import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/shopContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HiShoppingBag } from 'react-icons/hi'
import MiniCart from './MiniChart'
import { HiSun, HiMoon } from 'react-icons/hi';
import LulliLogo from '../assets/lulli-pink-logo.png'
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');
  const [mounted, setMounted] = useState(false);
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map((item: any) => {
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

  useEffect(() =>{
    setMounted(true);
  },[])

  const router = useRouter();

  const pathname = router.pathname;
  let determiner = false;

  if(pathname === "/") {
    determiner = true;
  }
  // useEffect(() => {
  //   const changeColor = () => {
  //     if (window.scrollY >= 90) {
  //       setColor('black');
  //       setTextColor('#ffffff');
  //     } else {
  //       setColor('transparent');
  //       setTextColor('#ffffff');
  //     }
  //   };
  //   window.addEventListener('scroll', changeColor);
  // }, []);
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
    </div>
  );
};

export default Navbar;
