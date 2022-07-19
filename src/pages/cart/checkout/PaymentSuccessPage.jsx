import React, { useEffect, useState } from 'react'

const PaymentSuccessPage = () => {

  localStorage.cart = []
  const [order, setOrder] = useState([])
  const [items, setItems] = useState([])


  const getPurchase = async () => {
    fetch("http://localhost:4000/api/v1/orders/purchase", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setOrder(data)
            setItems(data.products)
          })
        }
      })
  }

  useEffect(() => {
    getPurchase()
  }, [])

  return (
    <div>
      <h1>Invoice</h1>
      {items.map((item, i) => {
        return (
            <p key={i}>
              {item.name}, ${item.price / 100} {item.quantity}
            </p>
        );
      })}
      TOTAL: ${order.total / 100}
    </div>
  );
}

export default PaymentSuccessPage