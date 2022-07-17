import React, { useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';

const Button = styled.button`
  ${tw`
        bg-blue-500 
        hover:bg-blue-700 
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded
    `}
`;


const Cart = () => {

    const [cart, setCart] = useState(
      localStorage.cart ? JSON.parse(localStorage.cart) : []
    );

    const createCheckout = () => {
      fetch("http://localhost:4000/api/v1/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: JSON.parse(localStorage.cart),
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          window.location = url;
        })
        .catch((err) => {
          console.error(err.error);
        });
    };

    const increase = (index) => {
        cart[index].quantity++
        setCart(...cart)
        localStorage.cart = JSON.stringify(cart);
    }
    
    const decrease = (index) => {
        cart[index].quantity--
        setCart(...cart)
        localStorage.cart = JSON.stringify(cart);
    }

    return (
      <div>
        <ul>
          {cart.map((cartItem, i) => {
            return (
              <li key={i}>
                {cartItem.name}, {cartItem.quantity}
                {/* <Button onClick={() => increase(i)}>+</Button>
                <Button onClick={() => decrease(i)}>-</Button> */}
              </li>
            );
          })}
            </ul>
            <Button onClick={createCheckout}>Checkout</Button>
      </div>
    );
}

export default Cart