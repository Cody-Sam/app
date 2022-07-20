function FormInput({ name, value, placeholder, onChange }) {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    ></input>
  );
}
export default FormInput;
