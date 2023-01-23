import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HiShoppingBag } from 'react-icons/hi'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#ffffff');
        setTextColor('#000000');
      } else {
        setColor('transparent');
        setTextColor('#ffffff');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className='fixed left-0 top-0 w-full z-10 ease-in duration-300'
    >
      <div className='flex justify-between items-center p-4 text-white'>
        <div className='flex items-center p-4'>
          <Link href='/' className='mr-4'>
            <h1 style={{ color: `${textColor}` }} className='font-bold text-4xl'>
              Lullipop
            </h1>
          </Link>
          {/* Mobile Button */}
          <div onClick={handleNav} className='block sm:z-10'>
            {nav ? (
              <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
            ) : (
              <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
            )}
          </div>
          <div className="flex px-32 min-w-full lg:min-w-[500px]">
              <input type="text" placeholder='Search' className="bg-pink text-black outline-8 border-8 border-white rounded-3xl px-8" />
          </div>
        </div>
        <div className='max-w-[1240px] flex items-center'>
          <HiShoppingBag size="2rem" />
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
              : 'absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
          }
        >
          <ul>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/'>Lullipop</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#gallery'>Shop</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/work'>Lullifit</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
