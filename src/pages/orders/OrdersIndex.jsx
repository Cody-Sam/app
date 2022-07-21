import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import ShowOrder from "./ShowOrder";
import format from "date-fns/format";

const PageContainer = styled.div`
  ${tw`
    h-full
    w-full
    flex
    items-center
    justify-center
    flex-col
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
    
    const Text = styled.h1`
    ${tw`
    text-center
    mx-5
    text-lg
    border-2
    p-6
    border-gray-900
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


function OrdersIndex() {


  const [orders, setOrders] = useState()

  const currentUserOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    const ordersRes = await res.json();
    setOrders(ordersRes)
  }

  useEffect(() => {
    currentUserOrders()
  }, [])

  const [dateStr, setDateStr] = useState([]);

  const buildDateStr = async () => {
    orders.forEach(order => {
      const orderDate = order.createdAt;
      const str = format(new Date(orderDate), "dd.MM.yyyy");

      setDateStr([...dateStr, str]);
    })
  };
  useEffect(() => {
    buildDateStr();
  }, [orders]);


  if (orders && orders.length > 0) {
    return (
      <PageContainer>
          {orders &&
            orders.map((order, i) => {
              return (
                <Items key={i}>
                  <Text>{order._id}</Text>
                  <Text>{dateStr[i]}</Text>
                  <Text>${order.total}</Text>
                  <Link to={`${order._id}`}>
                    <Button>Order Details</Button>
                  </Link>
                </Items>
              );
            })}
      </PageContainer>
    );
  } else {
    return (
      <PageContainer>
                <Text>You have made no orders</Text>
        <Link to="../../shop">
          <Button className="mt-5">Start Shopping</Button>
        </Link>
      </PageContainer>
  )
  }
}
export default OrdersIndex;
