function ContentWrapper() {
  return null;
}

function PageWrapper({ focus, children }) {
  return (
    <>
      {!focus && (
        <div className="absolute left-12 right-0 top-0 bottom-0 overflow-x-hidden bg-black/70 blur-sm z-40"></div>
      )}
      <div className="absolute left-12 right-0 top-12 bottom-0 overflow-x-hidden z-20">
        {children}
      </div>
    </>
  );
}
ContentWrapper.Page = PageWrapper;

function GridWrapper({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-8">{children}</div>
  );
}
ContentWrapper.Grid = GridWrapper;

function FlexWrapper({ children }) {
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center p-8">
      {children}
    </div>
  );
}
ContentWrapper.Flex = FlexWrapper;

export default ContentWrapper;
