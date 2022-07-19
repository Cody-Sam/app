import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
function GPUPage({ page, setPage, build, setBuild }) {
  return (
    <ContentWrapper.Flex>
      <Card>
        <Card.Body>Graphics Processor</Card.Body>
        <Card.Footer>
          <button onClick={() => setPage("overview")}>Return</button>
        </Card.Footer>
      </Card>
    </ContentWrapper.Flex>
  );
}

export default GPUPage;
