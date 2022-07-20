import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BuildContext } from "modules/build";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";

function SelectItemDefault({ products }) {
  const { page, setPage, build, buildDispatch } = useContext(BuildContext);
  const filteredProducts = products.filter((p) => (p.type == page));

  return (
    <ContentWrapper.Grid>
      {filteredProducts.map((product) => {
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
                  setPage("overview");
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
