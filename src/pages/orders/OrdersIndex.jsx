import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlowCard from "../../components/GlowCard";
import ShowOrder from "./ShowOrder";



function OrdersIndex() {

  const [orders, setOrders] = useState()

  const currentUserOrders = async () => {
    const res = await fetch("http://localhost:4000/api/v1/orders/me", {
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

  return (
    <div className="test">
      {orders && orders.map((order, i) => {
        return (
          <div key={i}>
            <h1>ORDER {i + 1}</h1>
            <Link to={`${order._id}`}>View Order</Link>
            {order.products.map((product, i) => {
              return (
                <div key={i}>
                  <h2>{product.name}</h2>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    //   <div className="flex flex-wrap gap-24 items-start justify-center py-8">
    //   <GlowCard>
    //     <h1 className="text-4xl z-20 text-center">
    //       This is a list of your orders
    //     </h1>
    //   </GlowCard>
    //   <GlowCard>
    //     <h1 className="text-4xl z-20 text-center">
    //       track shipping or something
    //     </h1>
    //   </GlowCard>
    //   <GlowCard>
    //     <h1 className="text-4xl z-20 text-center">These are only here</h1>
    //   </GlowCard>
    //   <GlowCard>
    //     <h1 className="text-4xl z-20 text-center"> To demonstrate </h1>
    //   </GlowCard>
    //   <GlowCard>
    //     <h1 className="text-4xl z-20 text-center"> page scrolling</h1>
    //   </GlowCard>
    // </div>
  );
}

export default OrdersIndex;
