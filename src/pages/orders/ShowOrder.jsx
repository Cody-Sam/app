import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReviewItem from './ReviewItem'

const ShowOrder = () => {

    const [order, setOrder] = useState()

    const { id } = useParams()
    
    const getOrder = async () => {
      const res = await fetch(`http://localhost:4000/api/v1/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.token}`,
        },
      });
      const ordersRes = await res.json();
      setOrder(ordersRes);
    };


    
    const [showReview, setShowReview] = useState([false, 0])

    useEffect(() => {
      getOrder();
    }, []);

    return (
      <div className="test">
        {order &&
          order.map((order, i) => {
            return (
              <div key={i}>
                <h1>ORDER {order._id}</h1>
                {order.products.map((product, i) => {
                    return (
                        <div key={i}>
                            <h2>{product.name}</h2>
                            <button onClick={() => setShowReview([!showReview[0], i])}>Review Item</button>
                        {(showReview[0] && showReview[1] == i) && <ReviewItem product={product} />}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
}

export default ShowOrder