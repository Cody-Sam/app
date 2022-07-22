import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import format from "date-fns/format";
import ReviewItem from "./ReviewItem";

const PageContainer = styled.div`
  ${tw`
    h-full
    w-full
    flex
    flex-col
    items-center
    justify-center
  `}
`;

const OrderContainer = styled.div`
  ${tw`
    flex
    flex-col
    text-xl
    justify-center
    items-center
    my-5
    `}
`;

const Items = styled.div`
  ${tw`
    flex
    flex-col
    text-xl
    justify-center
    items-center
    my-5
    `}
`;

const Text = styled.h1`
  ${tw`
  my-5
    w-[17em]
    text-center
    mx-5
    text-base
    border-2
    p-6
    border-gray-900
  `}
`;

const Button = styled.button`
  ${tw`
        flex
        my-6
        items-center
        justify-center
        text-center
        bg-gray-900
        text-base
        hover:bg-red-900
        text-white 
        font-bold 
        py-4 
        px-8 
        rounded
        ease-in-out
        duration-200
        m-5
    `}
`;

const ShowOrder = () => {
  const [order, setOrder] = useState();
  const [loaded, setLoaded] = useState(false);

  const { id } = useParams();

  const getOrder = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    const ordersRes = await res.json();
    setOrder(ordersRes);
    setLoaded(true);
  };

  const [showReview, setShowReview] = useState([false, 0]);

  const [dateStr, setDateStr] = useState("");

  const buildDateStr = async () => {
    const orderDate = order.createdAt;
    const str = format(new Date(orderDate), "dd.MM.yyyy");
    setDateStr(str);
  };

  useEffect(() => {
    getOrder();
    setDateStr();
  }, []);

  useEffect(() => {
    buildDateStr();
  }, [order]);

  return (
    loaded && (
      <PageContainer>
        <OrderContainer>
          <Text>{order._id}</Text>
          <Text>{dateStr}</Text>
          <Items>
            {order.products.map((product, i) => {
              return (
                <div className="flex flex-col md:flex-row" key={i}>
                  <Text>
                    {product.name} | ${product.price / 100}
                  </Text>
                  <Button onClick={() => setShowReview([!showReview[0], i])}>
                    Review This Product
                  </Button>
                  {showReview[0] && showReview[1] == i && (
                    <ReviewItem product={product} />
                  )}
                </div>
              );
            })}
          </Items>
          <Text>${order.total/100}</Text>
        </OrderContainer>
      </PageContainer>
    )
  );
};

export default ShowOrder;
