import GlowCard from "../../components/GlowCard";

function OrdersIndex() {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">
          This is a list of your orders
        </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">
          track shipping or something
        </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">These are only here</h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center"> To demonstrate </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center"> page scrolling</h1>
      </GlowCard>
    </div>
  );
}

export default OrdersIndex;
