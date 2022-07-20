import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowOrder = () => {

    const [order, setOrder] = useState([])

    const { id } = useParams()
    
    const getOrder = async () => {
      const res = await fetch(`http://localhost:4000/api/v1/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.token}`,
        },
      });
        const orderRes = await res.json();
        console.log(orderRes)
        setOrder(orderRes)
    };

    useEffect(() => {
      getOrder();
    }, []);

  return (
    <div>{order[0]._id}</div>
  )
}

export default ShowOrder