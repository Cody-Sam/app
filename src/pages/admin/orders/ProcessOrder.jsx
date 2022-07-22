import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import readableRandom from "modules/random";
import { UserContext } from "modules/user";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";

function ProcessOrder() {
  const { orderID } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState({});
  const [trackingCode, setTrackingCode] = useState("");
  const { userStore } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/orders/${orderID}`,
        {
          headers: {
            authorization: "Bearer " + userStore.token,
          },
        }
      );
      const data = await res.json();
      setOrder(data[0]);
      setLoaded(true);
    }
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setOrder({ ...order, trackingCode, status: "In Transit" });
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/orders/${orderID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userStore.token}`,
        },
        body: JSON.stringify(order),
      }
    );
    console.log(res);
    const data = await res.json();
  }

  if (loaded) {
    return (
      <ContentWrapper.Flex>
        <Card>
          <Card.Header>{readableRandom(order._id).id}</Card.Header>
          <Card.Body>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card.Body>
          <Card.Footer>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div>
                <label htmlFor="tracking">Shipping Tracking: </label>
                <input
                  name="tracking"
                  className="bg-gray-800 border px-2 rounded mx-2 mt-2 ring"
                  value={trackingCode}
                  onChange={(event) => setTrackingCode(event.target.value)}
                ></input>
              </div>
              <button className="bg-gray-800 border px-2 rounded mx-2 my-4 ring">
                Order Packed
              </button>
            </form>
          </Card.Footer>
        </Card>
      </ContentWrapper.Flex>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default ProcessOrder;
