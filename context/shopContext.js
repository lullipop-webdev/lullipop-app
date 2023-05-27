import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout, getCustomerDetails, getCustomerDefaultAddress, createCart } from '../lib/Shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [cartLoading, setCartLoading] = useState(false)
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: ""
  })
  const [defaultAddress, setDefaultAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    country: "",
    province: "",
    zip: ""
  })

  useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')
      if(localStorage.accessToken) {
        getCustomerDetails(accessToken).then((data) => {
          setData({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
          })
        })
  
        getCustomerDefaultAddress(accessToken).then((data) => {
          setDefaultAddress({
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            country: data.country,
            province: data.province,
            zip: data.zip
          })
        })
      }
      
  }, [])

  useEffect(() => {
    if (localStorage.checkout_id) {

      const cartObject = JSON.parse(localStorage.checkout_id)

      if (cartObject[0].id) {
        setCart([cartObject[0]])
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]])
      }

      setCheckoutId(cartObject[1].id)
      setCheckoutUrl(cartObject[1].webUrl)
    }

  }, [])

  async function addToCart(addedItem, qty) {
    console.log(addedItem);

    const newItem = {...addedItem}
    setCartOpen(true)

    if (cart.length === 0) {
      setCart([newItem])

      const checkout = await createCheckout(newItem.id, qty, data, defaultAddress)
      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = []
      let added = false

      cart.map(item => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newItem]
      }
      
      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter(item => item.id !== itemToRemove)
    setCartLoading(true)

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
    setCartLoading(false)

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  async function incrementCartItem(item) {
    setCartLoading(true)

    let newCart = []

    cart.map(cartItem => {
      if (cartItem.id === item.id) {
        cartItem.variantQuantity++
        newCart = [...cart]
      }
    })
    setCart(newCart)
    const newCheckout = await updateCheckout(checkoutId, newCart)

    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    setCartLoading(false)
  }

  async function decrementCartItem(item) {
    setCartLoading(true)

    if (item.variantQuantity === 1) {
      removeCartItem(item.id)
    } else {
      let newCart = []
      cart.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.variantQuantity--
          newCart = [...cart]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)

      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
    setCartLoading(false)
  }

  async function clearCart() {
    const updatedCart = []

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))

  }

  async function createCartAndGetCheckoutURL() {
    if(localStorage.checkout_id == undefined){
      return;
    }
    const cartObject = JSON.parse(localStorage.checkout_id)
    let items = cartObject[0];
    items = items.map((item) => {
      return {
        merchandiseId: item.id,
        quantity: item.variantQuantity,
      };
    });
    const data = await createCart(JSON.stringify(items).replace(/"([^"]+)":/g, (match, p1) => `${p1}:`));
    setCheckoutUrl(data.checkoutUrl);
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      removeCartItem,
      clearCart,
      cartLoading,
      incrementCartItem,
      decrementCartItem,
      createCartAndGetCheckoutURL,
    }}>
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }