import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  return (
    <div>
      <h1>{product.name}</h1>
      <div>{`$${product.price}`}</div>
      <div>{product.description}</div>
    </div>
  );
}
export default ShopItemPage;
