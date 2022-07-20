function FormSelect({
  name,
  value,
  width = "full",
  formatted = true,
  placeholder,
  onChange,
  options,
}) {
  return (
    <select
      value={value}
      className={`h-6 bg-black w-${width} ${formatted && "ring rounded"}`}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    >
      <option value=""></option>
      {options.map((option) => {
        return (
          <option key={option.slug} value={option.slug}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default FormSelect;
