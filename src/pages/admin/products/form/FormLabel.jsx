function FormLabel({ htmlFor, label, children }) {
  return (
    <label className="px-2 pt-2" htmlFor={htmlFor}>
      {children || label}
    </label>
  );
}

export default FormLabel;
