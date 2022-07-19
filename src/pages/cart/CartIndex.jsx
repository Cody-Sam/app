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
          authorization: `Bearer ${sessionStorage.token}`,
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
      cart[index].quantity++;
      localStorage.cart = JSON.stringify(cart);
      setCart(JSON.parse(localStorage.cart));
    }
    
  const decrease = (index) => {
      cart[index].quantity--
      localStorage.cart = JSON.stringify(cart);
      setCart(JSON.parse(localStorage.cart));
    }
  if (cart.length > 0) {
    return (
      <div>
        <ul>
          {cart.map((cartItem, i) => {
            return (
              <li key={i}>
                {cartItem.name}, {cartItem.quantity}, {`$${Math.floor((cartItem.price / 100) * cartItem.quantity)}`}
                <Button onClick={() => increase(i)}>+</Button>
                <Button onClick={() => decrease(i)}>-</Button>
              </li>
            );
          })}
        </ul>
        <Button onClick={createCheckout}>Checkout</Button>
      </div>
    );
  } else {
    return (
    <div>
      <h1>Cart Empty</h1>
    </div>
    )
  }
}

export default Cart