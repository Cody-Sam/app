import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

const Button = styled.button`
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

function ShopItemPage() {
  const [product, setProduct] = useState({});
  const { item } = useParams();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:4000/api/v1/products/${item}`);
      const data = await res.json();
      console.log(data);
      setProduct(data);
    }
    fetchData();
  }, []);

  const addToCart = () => {
    const foundItem = cart.find(item => item._id === product._id)
    if (foundItem) {
      foundItem.quantity++
    } else {
      setCart([...cart, { _id: product._id, quantity: 1, name: product.name }]);
     }
     localStorage.cart = JSON.stringify(cart)
   };

  const [cart, setCart] = useState(localStorage.cart ? JSON.parse(localStorage.cart) : []);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <div>{`$${product.price}`}</div>
      <div>{product.description}</div>
      <Button onClick={addToCart}>Add to Cart</Button>
    </div>
  );
}
export default ShopItemPage;
