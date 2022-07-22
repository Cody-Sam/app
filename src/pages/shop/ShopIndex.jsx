import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";
import { PageContainer } from "../../components/StyledComponents";

function ShopIndex() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  return products.length > 0 ? (
    <ContentWrapper.Grid>
      {products.map((product) => {
        return (
          <Card key={product._id}>
            {product.image && <Card.Media src={product.image.url} />}
            <Card.Header>
              <h1 className="text-4xl z-20">{product.name}</h1>
            </Card.Header>
            <Card.Body>{product.description}</Card.Body>
            <Card.Footer>
              <Link to={`item/${product._id}`}>View Item</Link>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  ) : (
      <PageContainer>LOADING...</PageContainer>
  )
}
export default ShopIndex;
