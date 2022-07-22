import { useContext } from "react";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts } from "modules/parts";
import { BuildContext } from "modules/build";
import { PageContainer, Button } from "../../components/StyledComponents";



function BuilderOverview({ products }) {

  const buildCheckout = async () => {
    let itemIds = []
    Object.entries(build).forEach(entry => itemIds.push(entry[1]))
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/build`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        items: itemIds,
      }),
    });
    let cart = []
    const data = res.json().then(items => {
      items.forEach(item => {
        cart.push({
          _id: item._id,
          quantity: 1,
        });
      })
    }).then(() => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/checkout/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        items: cart,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((err) => {
        console.error(err.error);
      });
    })
  }


  const { page, setPage, build, setBuild } = useContext(BuildContext);

      
  return (
    <PageContainer>
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
        <Button onClick={buildCheckout}>Checkout</Button>
    </PageContainer>
  );
}

export default BuilderOverview;
