import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const WishList = () => {

    const wishList = JSON.parse(localStorage.wishList);
    const [products, setProducts] = useState([])
    
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
        const data = await res.json()
        setProducts(data)
    };

    useEffect(() => {
        getItems()
    }, [])

    useEffect(() => {
        console.log(products)
    },[products])
    
    if (wishList.length > 0) {
        return (
            products && products.map((product, i) => {
                return (
                    <div key={i}>
                        <img src={product.image.url} alt="" />
                        <p>{product.name}</p>
                        <Link to={`../shop/item/${product._id}`}>View Product</Link>
                    </div>
                )
            })
        )
    } else {
        return (
            <div>
                Wish List empty
            </div>
        )
    }
}

export default WishList