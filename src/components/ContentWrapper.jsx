function ContentWrapper() {
  return null;
}

function PageWrapper({ children }) {
  return (
    <div className="absolute left-12 right-0 top-0 bottom-0 overflow-x-hidden">
      {children}
    </div>
  );
}
ContentWrapper.Page = PageWrapper;

function GridWrapper({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-8">{children}</div>
  );
}
ContentWrapper.Grid = GridWrapper;

export default ContentWrapper;
