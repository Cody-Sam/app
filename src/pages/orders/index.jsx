import OrdersIndex from "./OrdersIndex";
import ShowOrder from "./ShowOrder";

function Orders () {
  return <OrdersIndex />;
}

Orders.Index = OrdersIndex;
Orders.Show = ShowOrder

export default Orders;