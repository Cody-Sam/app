import GlowCard from "../../components/GlowCard";

function ShopIndex() {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">Shop Landing Page</h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">buy stuff </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">These are only here </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">To demonstrate </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">page scrolling</h1>
      </GlowCard>
    </div>
  );
}

export default ShopIndex;
