import ProductIndex from "./ProductIndex"
import CreateProduct from "./CreateProduct"
import EditProduct from "./EditProduct"

function Products () {
  return <ProductIndex />
}

Products.New = CreateProduct
Products.Edit = EditProduct

export default Products