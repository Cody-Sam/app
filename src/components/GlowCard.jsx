function GlowCard({ children }) {
  return (
    <div className="flex relative w-3/4 h-48">
      <div className="absolute z-10 w-full h-full flex justify-center items-center bg-black overflow-hidden">
        {children}
        <div className="absolute left-0 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
        <div className="absolute -left-8 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
      </div>
      <div className="absolute w-full h-full bg-conic-gradient filter blur-xl"></div>
      <div className="absolute w-full h-full bg-conic-gradient filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute -inset-0.5 rounded-sm bg-conic-gradient"></div>
    </div>
  );
}

export default GlowCard;
