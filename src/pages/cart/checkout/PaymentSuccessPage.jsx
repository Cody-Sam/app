import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import format from 'date-fns/format'

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

const ContentContainer = styled.div`
  ${tw`
    w-[75%]
    flex
    flex-col
    text-center
    items-center
    justify-center
  `}
`

const Heading = styled.h1`
  ${tw`
    text-4xl
  `}
`

const Subheading = styled.h3`
  ${tw`
    text-left
    text-xl
  `}
`

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

const PaymentSuccessPage = () => {

  localStorage.cart = []
  const [order, setOrder] = useState([])
  const [items, setItems] = useState([])


  const getPurchase = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/orders/purchase`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setOrder(data);
          setItems(data.products);
        });
      }
    });
  }

const [dateStr, setDateStr] = useState('')

  const buildDateStr = async () => {
    const orderDate = order.createdAt
      const str = format(new Date(orderDate), "dd.MM.yyyy");
    setDateStr(str)
  }

  useEffect(() => {
    getPurchase(),
      buildDateStr()
  }, [])
  useEffect(() => {
    buildDateStr()
  }, [order])

  return (
    <PageContainer>
      <div className="">
        <Heading>Invoice:{order._id}</Heading>
        <Subheading>{dateStr}</Subheading>
      </div>
      <ContentContainer className="mt-52">
        <Items>
          <ItemDetailsSection>Product</ItemDetailsSection>
          <ItemDetailsSection>Quantity</ItemDetailsSection>
          <ItemDetailsSection>Price</ItemDetailsSection>
        </Items>
        {items.map((item, i) => {
          return (
            <Items key={i}>
              <ItemDetailsSection>{item.name}</ItemDetailsSection>
              <ItemDetailsSection>{item.quantity}</ItemDetailsSection>
              <ItemDetailsSection>
                {`$${Math.floor(item.price / 100)}`}
              </ItemDetailsSection>
            </Items>
          );
        })}
        <ItemDetailsSection className='text-3xl text-left'>TOTAL: ${order.total / 100}</ItemDetailsSection>
      </ContentContainer>
    </PageContainer>
  );
}

export default PaymentSuccessPage