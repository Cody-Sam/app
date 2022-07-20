import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BuildContext } from "modules/build";
function SelectItemDefault() {
  const { page, setPage, build, buildDispatch } = useContext(BuildContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`);
      const data = await res.json();
      setProducts(data.filter((product) => product.type === page));
    }
    fetchData();
  }, []);
  console.log(page);
  return (
    <ContentWrapper.Grid>
      {products.map((product) => {
        return (
          <Card key={product._id}>
            {product.image && <Card.Media src={product.image.url} />}
            <Card.Header>
              <h1 className="text-xl z-20">{product.name}</h1>
            </Card.Header>
            <Card.Body>{product.description}</Card.Body>
            <Card.Footer>
              <Link to={`item/${product._id}`}>View Item</Link> |{" "}
              <button
                type="button"
                onClick={() => {
                  buildDispatch({
                    type: "setItem",
                    data: { type: page, value: product._id },
                  });
                  setPage("overview")
                }}
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

export default SelectItemDefault;
