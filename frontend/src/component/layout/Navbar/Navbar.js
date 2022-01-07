import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {

      
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    return (
        <div>
     {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                  )} 
        </div>
    )
}

export default Navbar
