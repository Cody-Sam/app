import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { Link } from "react-router-dom";

function BuilderOverview({ page, setPage, build, setBuild }) {
  const parts = [
    {name:"Case", slug:"case"},
    {name:"Processor", slug:"cpu"},
    {name:"Graphics Processor", slug:"gpu"},
    {name:"Motherboard", slug:"motherboard"},
    {name:"Memory", slug:"ram"},
    {name:"Storage", slug:"storage"},
    {name:"Case Cooling", slug:"case-cooling"},
    {name:"Processor Cooler", slug:"cpu-cooler"},
    {name:"Power Supply", slug:"psu"},
  ];
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
