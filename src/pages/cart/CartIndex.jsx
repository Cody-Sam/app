import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

const CartContainer = styled.div`
  ${tw`
    h-screen
    w-full
    flex
    items-center
    justify-center
    flex-col
    my-24
  `}
`;
const CartItems = styled.div`
  ${tw`
    w-[75%]
    h-[75%]
    flex
    flex-col
    md:flex-row
    text-xl
    justify-center
    items-center
    my-5

  `}
`;

const CartItemDetailsSection = styled.div`
  ${tw`
    w-[100%]
    items-center
    justify-center
    text-center
  `}
`;

const ImageContainer = styled.div`
  ${tw`
    mx-5
    w-[50%]
    flex
    items-center
    justify-center
  `}

  img {
    ${tw`
      max-w-[20em]
      max-h-[10em]
    `}
  }
`;

const QtyButtonContainer = styled.div`
  ${tw`
    flex
    flex-row
  `}
`;

const Button = styled.button`
  ${tw`
        bg-gray-900
        hover:bg-red-900
        text-white 
        font-bold 
        py-4 
        px-8 
        rounded
        ease-in-out
        duration-200
    `}
`;

const QtyButtons = styled.button`
  ${tw`
        w-12
        bg-gray-900
        hover:bg-red-900
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded
        ease-in-out
        duration-200
        mx-1
    `}
`;

const CartText = styled.h1`
  ${tw`
    text-5xl
    border-2
    p-6
    border-gray-900
  `}
`;

const Cart = () => {
  const [cart, setCart] = useState(
    localStorage.cart ? JSON.parse(localStorage.cart) : []
  );

  const createCheckout = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/checkout/create`, {
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
  };

  const decrease = (index) => {
    if (cart[index].quantity === 1) {
      const newCart = cart
      newCart.splice(index, 1);
      localStorage.cart = JSON.stringify(newCart);
      setCart(JSON.parse(localStorage.cart));
    }
    cart[index].quantity--;
    localStorage.cart = JSON.stringify(cart);
    setCart(JSON.parse(localStorage.cart));
  };
  
  if (cart.length > 0) {
    return (
      <CartContainer>
        {cart.map((cartItem, i) => {
          return (
            <CartItems key={i}>
              <ImageContainer>
                <img src={cartItem.img} alt="" />
              </ImageContainer>
              <CartItemDetailsSection>{cartItem.name}</CartItemDetailsSection>
              <CartItemDetailsSection>{cartItem.quantity}</CartItemDetailsSection>
              <CartItemDetailsSection>{`$${Math.floor((cartItem.price / 100) * cartItem.quantity)}`}</CartItemDetailsSection>
              <QtyButtonContainer>
                <QtyButtons onClick={() => increase(i)}>+</QtyButtons>
                <QtyButtons onClick={() => decrease(i)}>-</QtyButtons>
              </QtyButtonContainer>
            </CartItems>
          );
        })}
        <Button onClick={createCheckout}>Checkout</Button>
      </CartContainer>
    );
  } else {
    return (
      <CartContainer>
        <CartText>Cart Empty</CartText>
        <Link to="../../shop">
          <Button className="mt-5">Start Shopping</Button>
        </Link>
      </CartContainer>
    );
  }
};

export default Cart;
