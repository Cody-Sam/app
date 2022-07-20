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
      setProduct(data);
    }
    fetchData();
  }, []);

  const [cart, setCart] = useState(
    localStorage.cart ? JSON.parse(localStorage.cart) : []
  );

  const addToCart = () => {
    const foundItem = cart.find((item) => item._id === product._id);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      setCart([
        ...cart,
        {
          _id: product._id,
          quantity: 1,
          name: product.name,
          price: product.price,
        },
      ]);
    }
  };



  const saveCartToStorage = () => {
    localStorage.cart = JSON.stringify(cart);
  };

  useEffect(() => {
    saveCartToStorage();
  }, [cart]);

  const [wishList, setWishList] = useState(
    localStorage.wishList ? JSON.parse(localStorage.wishList) : []
  );
  const [wishListButtonText, setWishListButtonText] = useState("");

  const setText = () => {
    const exists = wishList.find((item) => item._id === product._id);
    if (exists) {
      setWishListButtonText("Remove from watch list");
    } else {
      setWishListButtonText("Add to wish list");
    }
  };
  const wishListToggle = () => {
    const exists = wishList.find((item) => item._id === product._id);
    if (exists) {
      const itemIndex = wishList.findIndex((obj) => {
        return obj._id === product._id;
      });
      const newWish = wishList;
      newWish.splice(itemIndex, 1);
      setWishList([...newWish]);
    } else {
      setWishList([...wishList, { _id: product._id }]);
    }
  };

  const saveWishToStorage = () => {
    localStorage.wishList = JSON.stringify(wishList);
  };

  useEffect(() => {
    setText(), saveWishToStorage();
  }, [wishList]);

  return (
    <div>
      <h1>{product.name}</h1>
      <div>{`$${product.price / 100}`}</div>
      <div>{product.description}</div>
      <Button onClick={addToCart}>Add to Cart</Button>
      <Button onClick={wishListToggle}>{wishListButtonText}</Button>
    </div>
  );
}
export default ShopItemPage;
