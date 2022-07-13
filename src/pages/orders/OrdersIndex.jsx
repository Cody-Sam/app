import GlowCard from "../../components/GlowCard";

function OrdersIndex() {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard header="This is a list of your orders" />
      <GlowCard header="track shipping or something" />
      <GlowCard header="These are only here" />
      <GlowCard header="To demonstrate" />
      <GlowCard header="page scrolling" />
    </div>
  );
}

export default OrdersIndex;
