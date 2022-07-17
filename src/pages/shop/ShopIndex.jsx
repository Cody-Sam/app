import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";

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
    <ContentWrapper.Grid>
      {products.map((product) => {
        return (
          <Card key={product._id}>
            <Card.Header>
              <h1 className="text-4xl z-20 text-center">{product.name}</h1>
            </Card.Header>
            <Card.Body>{product.description}</Card.Body>
            <Card.Footer>
              <Link to={`item/${product._id}`}>View Item</Link>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  );
}
export default ShopIndex;
