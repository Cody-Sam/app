import ProductIndex from "./ProductIndex"
import CreateProduct from "./CreateProduct"

function Products () {
  return <ProductIndex />
}

Products.New = CreateProduct

export default Products