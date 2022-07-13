import GlowCard from "../../components/GlowCard";

function ShopIndex() {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard header="Shop Landing Page" />
      <GlowCard header="buy stuff" />
      <GlowCard header="These are only here" />
      <GlowCard header="To demonstrate" />
      <GlowCard header="page scrolling" />
    </div>
  );
}

export default ShopIndex;
