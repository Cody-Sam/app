function FormNumber({ name, value, onChange }) {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      type="number"
      onChange={(event) => onChange(Number(event.target.value))}
    ></input>
  );
}
export default FormNumber;
