import CartIndex from "./CartIndex"
import Checkout from "./checkout"

function Cart () {
  return <CartIndex />
}

Cart.Index = CartIndex;
Cart.Checkout = Checkout;

export default Cart
export {Cart, Checkout}