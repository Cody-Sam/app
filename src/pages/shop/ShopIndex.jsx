import GlowCard from "../../components/GlowCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShopIndex() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/api/v1/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      {products.map((product) => {
        return (
          <GlowCard key={product._id}>
            <h1 className="text-4xl z-20 text-center">{product.name}</h1>
            <Link to={`item/${product._id}`}>View Item</Link>
          </GlowCard>
        );
      })}

    </div>
  );
}
export default ShopIndex;
