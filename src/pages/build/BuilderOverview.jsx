import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts } from "modules/parts";
import { Link } from "react-router-dom";

function BuilderOverview({ page, setPage, build, setBuild }) {
  return (
    <ContentWrapper.Grid>
      {parts.map((part) => {
        return (
          <Card key={part.name}>
            <Card.Header>{part.name}</Card.Header>
            <Card.Body>{build[part.slug]}</Card.Body>
            <Card.Footer>
              <button
                onClick={() => {
                  setPage(part.slug);
                }}
              >
                Add {part.name}
              </button>
            </Card.Footer>
          </Card>
        );
      })}
    </ContentWrapper.Grid>
  );
}

export default BuilderOverview;
