interface Option {
  value: string | number;
  name: string;
}

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
  handleChange: (e: any) => void;
}

export function SelectInput({
  id,
  name,
  label,
  options,
  value,
  error,
  handleChange,
}: SelectInputProps) {
  return (
    <div className={`flex flex-col gap-1  ${label && "gap-1"}`}>
      <label className="font-semibold">{label}</label>
      <select
        id={id}
        name={name}
        className="rounded-md px-2 py-1 dark:bg-[#3c4856] border border-tertiary/20 dark:border-slate-600"
        value={value}
        onChange={handleChange}
      >
        <option value="">Select a category...</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
