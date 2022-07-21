import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

const PageContainer = styled.div`
  ${tw`
    h-full
    w-full
    flex
    items-center
    justify-center
    flex-col
    `}
`;

const Items = styled.div`
  ${tw`
    flex
    text-xl
    justify-center
    items-center
    my-5
    `}
`;

const ItemDetailsSection = styled.div`
  ${tw`
    w-52
    items-center
    justify-center
    text-center
  `}
`;

const ImageContainer = styled.div`
  ${tw`
    mx-5
  `}

  img {
    ${tw`
      w-36
    `}
  }
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

const Text = styled.h1`
  ${tw`
    text-5xl
    border-2
    p-6
    border-gray-900
  `}
`;

const WishList = () => {
  const wishList = JSON.parse(localStorage.wishList);
  const [products, setProducts] = useState([]);

  const getItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/watchlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...wishList]),
      }
    );
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getItems();
  }, []);
    

  if (wishList.length > 0) {
    return (
      <PageContainer>
        {products &&
          products.map((product, i) => {
            return (
              <Items key={i}>
                <ImageContainer>
                  <img src={product.image.url} alt="" />
                </ImageContainer>
                <ItemDetailsSection>{product.name}</ItemDetailsSection>
                <ItemDetailsSection>{`$${Math.floor(
                  product.price / 100
                )}`}</ItemDetailsSection>
                <Link to={`../shop/item/${product._id}`}>
                  <Button>View Product</Button>
                </Link>
              </Items>
            );
          })}
      </PageContainer>
    );
  } else {
      return (
          <PageContainer>
            <Text>Your Wishlist is empty</Text>
            <Link to="../../shop">
              <Button className="mt-5">Start Shopping</Button>
            </Link>
          </PageContainer>
      )
  }
};

export default WishList;
