import OrderIndex from "./OrderIndex";
import ProcessOrder from "./ProcessOrder";

function Orders() {
  return <OrderIndex />;
}

Orders.Process = ProcessOrder

export default Orders;
