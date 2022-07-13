import GlowCard from "../components/GlowCard";

function IndexPage() {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard header="This is the index page" />
      <GlowCard header="Build Your Dream PC" />
      <GlowCard header="These are only here" />
      <GlowCard header="To demonstrate" />
      <GlowCard header="page scrolling" />
    </div>
  );
}

export default IndexPage;
