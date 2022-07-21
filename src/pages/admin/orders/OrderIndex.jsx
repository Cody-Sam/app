import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "modules/user";
import ContentWrapper from "components/ContentWrapper";
import { MdModeEdit, MdLens } from "react-icons/md";
import readableRandom from "modules/random/";

function OrderIndex() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { userStore, userDispatch } = useContext(UserContext);
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders`, {
        headers: { authorization: "Bearer " + userStore.token },
      });

      const data = await res.json();
      console.log(data);
      const unprocessedOrders = data.filter(
        (order) => order.status === "unfulfilled"
      );

      setOrders(data);
    }
    fetchOrders();
    setLoaded(true);
    console.log(readableRandom("62d56996a7fc8cb8da8b873f"));
  }, []);
  if (loaded) {
    return (
      <ContentWrapper.Flex>
        <div className="w-3/4">
          <div>Orders</div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Number of items</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                let { id, colour } = readableRandom(order._id);
                return (
                  <tr className="border-y py-4 text-center h-16" key={order._id}>
                    <td className="flex justify-center">
                       {id}<MdLens size="1.5em" color={colour} />
                    </td>
                    <td>{order.products.length}</td>
                    <td>{order.status}</td>
                    <td className="flex justify-center">
                      <Link className="h-full my-auto" to={order._id}>
                        <MdModeEdit size="2rem"/>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ContentWrapper.Flex>
    );
  } else {
    <div> loading... </div>;
  }
}

export default OrderIndex;
