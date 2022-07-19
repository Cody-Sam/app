import PaymentSuccessPage from "./PaymentSuccessPage";
import PaymentFailurePage from "./PaymentFailurePage";

function Checkout() {}

Checkout.Success = PaymentSuccessPage;
Checkout.Failure = PaymentFailurePage;

export default Checkout;
