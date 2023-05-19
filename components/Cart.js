import React, { Fragment, useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/shopContext'
import Image from 'next/image'
import { BiPlus, BiMinus, BiTrash } from 'react-icons/bi';
import { formatter } from '../utlis/helpers'
import Link from 'next/link';

const Cart = () => {
  const { cart, cartOpen, setCartOpen, checkoutId, checkoutUrl, removeCartItem, incrementCartItem, decrementCartItem } = useContext(CartContext);

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })

  const [activeStep, setActiveStep] = useState('reviewOrder');

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="container mx-auto dark:bg-black">
      <div className="flex mb-8 justify-center px-8">
        <button
          className={`px-10 py-2 border w-60 py-4 font-semibold ${
            activeStep === 'reviewOrder' ? 'bg-pink-500 text-white' : 'text-gray-800'
          }`}
          onClick={() => handleStepChange('reviewOrder')}
        >
          Review Order
        </button>
        <button
          className={`px-10 py-2 border w-60 py-4 font-semibold ${
            activeStep === 'shippingBilling' ? 'bg-pink-500 text-white' : 'text-gray-800'
          }`}
          onClick={() => handleStepChange('shippingBilling')}
        >
          Shipping & Billing
        </button>
        <button
          className={`px-10 py-2 border w-60 py-4 font-semibold ${
            activeStep === 'payment' ? 'bg-pink-500 text-white' : 'text-gray-800'
          }`}
          onClick={() => handleStepChange('payment')}
        >
          Payment
        </button>
        <button
          className={`px-10 py-2 border w-60 py-4 font-semibold ${
            activeStep === 'confirmation' ? 'bg-pink-500 text-white' : 'text-gray-800'
          }`}
          onClick={() => handleStepChange('confirmation')}
        >
          Confirmation
        </button>
      </div>

      <div className="flex flex-wrap mb-10 px-6 xl:px-0">
        {activeStep === 'reviewOrder' && (
          <div className="grow-0 shrink-0 basis-auto w-full px-8 py-10">
            <div className="flex justify-between pb-8">
              <h1 className="font-semibold text-2xl text-dark dark:text-white">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartQuantity} Items</h2>
            </div>
            <div className='pb-8 border-b'>
              <table className="table border-collapse w-full">
                  <thead>
                    <tr className='uppercase'>
                      <th className="border-b text-left pb-4 text-xs font-normal">Product Details</th>
                      <th className="hidden md:block border-b text-left pb-4 text-xs font-normal">Quantity</th>
                      <th className="border-b text-left pb-4 text-xs font-normal text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
              {
                cart.map((product, i) => {
                  return (
                    <tr key={product.id  + Math.random()}>
                      <td className="pt-8 w-3/5">
                        <div className="flex">
                          <div className='w-24'>
                            <Image src={product.image} alt={product.title} width={150} height={220}/>
                          </div>
                          <div className='w-full flex flex-col pl-4'>
                            <span className="text-gray-900 dark:text-white">{product.title}</span>
                            <span className="dark:text-white text-gray-500 mt-2">{formatter.format(product.variantPrice)}</span>
                            <span className="dark:text-white text-gray-500 mt-2">{product.variantTitle}</span>
                            <div className="flex items-center w-1/4 mt-2 md:hidden">
                              <div className='border flex justify-center items-center h-10 px-6'>
                                <button className="w-8 h-full text-dark dark:text-white focus:outline-none" onClick={() => {
                                  decrementCartItem(product)
                                }}>
                                  <BiMinus className="h-4 w-6 fill-current" size={12}/>
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
                                <button className="w-1/4 h-full text-dark dark:text-white focus:outline-none" onClick={() => {
                                  incrementCartItem(product)
                                }}>
                                  <BiPlus className="h-4 w-6 fill-current" size={12}/>
                                </button>
                              </div>
                              <Link href="#" className="hover:text-gray-500 ml-4"><BiTrash size={16}/></Link>
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td className="pt-8 w-1/3 hidden md:block">
                        <div className="flex items-center w-1/4">
                          <div className='border flex justify-center items-center h-14 px-6'>
                            <button className="w-8 h-full text-dark dark:text-white focus:outline-none" onClick={() => {
                              decrementCartItem(product)
                            }}>
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
                            <button className="w-1/4 h-full text-dark dark:text-white focus:outline-none" onClick={() => {
                              incrementCartItem(product)
                            }}>
                              <BiPlus className="h-6 w-6 fill-current" size={24}/>
                            </button>
                          </div>
                          <Link href="#" onClick={ () => {
                            removeCartItem(product.id);
                          }} className="hover:text-gray-500 ml-4"><BiTrash size={16}/></Link>
                        </div>
                      </td>
                      <td className="pt-8 w-1/3 text-right">
                        <span className="text-center w-1/4 text-sm">{formatter.format((product.variantPrice * product.variantQuantity))}</span>
                      </td>
                    </tr>
                  )
                })
              }
                </tbody>
              </table>
            </div>
            <Link href="/shop" className="flex font-semibold text-pink-400 text-sm mt-10">
              <svg className="fill-current mr-2 text-pink-400 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
              Continue Shopping
            </Link>

            <div className='pt-8 flex'>
              <div className='ml-auto'>
                <div>
                  <div className='flex items-end mb-3' style={{justifyContent: 'flex-end'}}>
                    <h2>Subtotal</h2>
                    <span className='ml-4 text-xl'>{formatter.format(cartTotal)}</span>
                  </div>
                  <small className="flex" style={{justifyContent: 'flex-end'}}>Taxes and shipping calculated at checkout</small>
                </div>
                <div className='mt-3 flex' style={{justifyContent: 'flex-end'}}>
                  <Link onClick={() => { handleStepChange('shippingBilling') }} href='#' className="block text-center px-32 bg-pink-400 font-semibold hover:bg-gray-600 py-3 text-white uppercase">
                    Place Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart