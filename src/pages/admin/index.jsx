import AdminIndex from "./AdminIndex";
import Products from "./products";
import Orders from "./orders";

function Admin() {
  return <AdminIndex />;
}

Admin.Products = Products;
Admin.Orders = Orders;

export default Admin;
export { Admin, Products, Orders };
