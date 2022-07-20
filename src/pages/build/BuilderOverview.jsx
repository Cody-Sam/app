import { useContext } from "react";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts } from "modules/parts";
import { BuildContext } from "modules/build";

function BuilderOverview({ products }) {
  const { page, setPage, build, setBuild } = useContext(BuildContext);
  return (
    <ContentWrapper.Grid>
      {parts.map((part) => {
        const product = products.find(
          (element) => element._id == build[part.slug]
        );
        return (
          <Card key={part.name}>
            <Card.Header>{part.name}</Card.Header>
            <Card.Body>{product && product.name}</Card.Body>
            <Card.Footer>
              <button
                onClick={() => {
                  setPage(part.slug);
                }}
              >
                Select {part.name}
              </button>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  );
}

export default BuilderOverview;
