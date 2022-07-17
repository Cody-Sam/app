import AdminIndex from "./AdminIndex"
import Products from "./Products";

function Admin() {
  return <AdminIndex />;
}

Admin.Products = Products;

export default Admin
export {Admin, Products}