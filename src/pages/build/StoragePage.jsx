import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
function StoragePage({ page, setPage, build, setBuild }) {
  return (
    <ContentWrapper.Flex>
      <Card>
        <Card.Body>Storage</Card.Body>
        <Card.Footer>
          <button onClick={() => setPage("overview")}>Return</button>
        </Card.Footer>
      </Card>
    </ContentWrapper.Flex>
  );
}

export default StoragePage;
