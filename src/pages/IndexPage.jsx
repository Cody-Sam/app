import ContentWrapper from "../components/ContentWrapper";
import GlowCard from "../components/GlowCard";
import Card from "../components/Card";

function IndexPage() {
  let cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push({
      key: i,
      src: "https://picsum.photos/400/400",
      title: `Card Number ${i + 1}`,
      body: "Card Body",
      footer: "card footer",
    });
  }
  return (
    <>
      <ContentWrapper.Flex>
        <GlowCard>
          <GlowCard.Body>
            <h1 className="text-4xl text-center">PC BUILDER 9001</h1>
          </GlowCard.Body>
        </GlowCard>
      </ContentWrapper.Flex>
      <ContentWrapper.Grid>
        {cards.map((card) => {
          return (
            <Card key={card.key}>
              <Card.Media src={card.src} />
              <Card.Header>{card.title}</Card.Header>
              <Card.Body>{card.body}</Card.Body>
              <Card.Footer>{card.footer}</Card.Footer>
            </Card>
          );
        })}
      </ContentWrapper.Grid>
    </>
  );
}

export default IndexPage;
