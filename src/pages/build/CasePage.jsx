import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function CasePage({ page, setPage, build, setBuild }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/api/v1/products");
      const data = await res.json();
      setProducts(data.filter((product) => product.type === "case"));
    }
    fetchData();
  }, []);
  return (
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
              <Link to={`item/${product._id}`}>View Item</Link> |{" "}
              <button
                type="button"
                onClick={() => setBuild({ ...build, case: product._id })}
              >
                Add to build
              </button>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  );
}

export default CasePage;
