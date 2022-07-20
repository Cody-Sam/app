import Card from "components/Card";
import ContentWrapper from "components/ContentWrapper";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductIndex() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);
  return (
    <ContentWrapper.Grid>
      <Card>
        <Card.Body>
          <Link to="new">Create a new product</Link>
        </Card.Body>
      </Card>
      {products.map((product) => {
        return (
          <Card key={product._id}>
            {product.image && <Card.Media src={product.image.url} />}
            <Card.Header>
              <h1 className="text-4xl z-20">{product.name}</h1>
            </Card.Header>
            <Card.Body><Link to={`/shop/item/${product._id}`}>View Item In Store</Link></Card.Body>
            <Card.Footer>
              <Link to={`edit/${product._id}`}>Edit</Link>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  );
}

export default ProductIndex;
