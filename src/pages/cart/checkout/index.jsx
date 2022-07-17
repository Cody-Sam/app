import CheckoutIndex from "./CheckoutIndex";
import PaymentSuccessPage from "./PaymentSuccessPage";
import PaymentFailurePage from "./PaymentFailurePage";

function Checkout() {
  return <Checkout />;
}

Checkout.Index = Checkout;
Checkout.Success = PaymentSuccessPage;
Checkout.Failure = PaymentFailurePage;

export default Checkout;