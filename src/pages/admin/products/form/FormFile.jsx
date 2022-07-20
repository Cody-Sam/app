function FormFile({ name, value, onChange }) {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      type="file"
      onChange={(event) => onChange(event)}
    ></input>
  );
}

export default FormFile;
