import { useContext } from "react";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts } from "modules/parts";
import { BuildContext } from "modules/build";

function BuilderOverview() {
  const { page, setPage, build, setBuild } = useContext(BuildContext);
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
                  console.log(part.slug)
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
