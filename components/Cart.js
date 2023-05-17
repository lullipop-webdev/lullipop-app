import React, { Fragment, useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/shopContext'
import Image from 'next/image'
import { BiPlus, BiMinus } from 'react-icons/bi';
import { formatter } from '../utlis/helpers'
import Link from 'next/link';

const Cart = () => {
  const { cart, cartOpen, setCartOpen, checkoutUrl, removeCartItem } = useContext(CartContext);

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })
  console.log(cart);  

  return (
    <div className="container mx-auto dark:bg-black">
      <div className="flex flex-wrap mb-10 px-6 xl:px-0">
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-3/4 px-8 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-dark dark:text-white">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartQuantity} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="text-dark dark:text-white uppercase w-2/5">Product Details</h3>
            <h3 className="text-center text-dark dark:text-white uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="text-center text-dark dark:text-white uppercase w-1/5 text-center">Price</h3>
            <h3 className="text-center text-dark dark:text-white uppercase w-1/5 text-center">Total</h3>
          </div>

          {
            cart.map((product) => {
              return (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.id  + Math.random()}>
                  <div className="flex w-2/5">
                    <div className="w-1/4">
                      <img src={product.image} alt={product.title}/>
                      {/* <img className="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt=""/> */}
                    </div>
                    <div className="flex flex-col justify-evenly ml-4 flex-grow">
                      <span className="text-gray-900 dark:text-white">{product.title}</span>
                      <span className="dark:text-white text-gray-500">{product.variantTitle}</span>
                      <Link href="#" className="text-red-500 hover:text-gray-500 dark:text-white">Remove</Link>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <div className='border flex justify-center items-center h-14 px-6'>
                      <button className="w-8 h-full text-dark dark:text-white focus:outline-none" onClick={() => {}}>
                        <BiMinus className="h-6 w-6 fill-current" size={24}/>
                      </button>
                      <input
                        className="w-10 text-center dark:bg-black dark:text-white text-dark outline-none focus:outline-none hover:text-black focus:text-black"
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={product.variantQuantity}
                        min={0}
                        max={99}
                        readOnly
                      />
                      <button className="w-1/4 h-full text-dark dark:text-white focus:outline-none" onClick={() => {}}>
                        <BiPlus className="h-6 w-6 fill-current" size={24}/>
                      </button>
                    </div> 
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">{formatter.format(product.variantPrice)}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">{formatter.format((product.variantPrice * product.variantQuantity))}</span>
                </div>
              )
            })
          }

          <Link href="#" className="flex font-semibold text-pink-400 text-sm mt-10">
            <svg className="fill-current mr-2 text-pink-400 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="grow-0 shrink-0 basis-auto w-full lg:w-1/4 px-8 py-10 border">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total Items: {cartQuantity}</span>
            <span className="font-semibold text-sm">{formatter.format(cartTotal)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input onChange={() => {}} type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{formatter.format(cartTotal)}</span>
            </div>
            <button className="bg-pink-400 font-semibold hover:bg-gray-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart