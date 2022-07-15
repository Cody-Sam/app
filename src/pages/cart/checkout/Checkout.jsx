import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const CheckoutButton = styled.button`
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

const Checkout = () => {
  const clickHandler = () => {
    fetch("http://localhost:4000/api/v1/checkout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ _id: "62ce24c517933478512bc021", quantity: 1 }],
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

  return (
    <div>
      <CheckoutButton onClick={clickHandler}>Checkout</CheckoutButton>
    </div>
  );
};

export default Checkout;
