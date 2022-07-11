function ContentWrapper({ children }) {
  return (
    <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-wrap gap-24 items-start justify-center py-8 overflow-x-hidden">
      {children}
    </div>
  );
}

export default ContentWrapper;