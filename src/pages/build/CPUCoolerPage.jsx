import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
function CPUCoolerPage({ page, setPage, build, setBuild }) {
  return (
    <ContentWrapper.Flex>
      <Card>
        <Card.Body>CPU Cooler</Card.Body>
        <Card.Footer>
          <button onClick={() => setPage("overview")}>Return</button>
        </Card.Footer>
      </Card>
    </ContentWrapper.Flex>
  );
}

export default CPUCoolerPage;
