interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  disabled = false,
  handleChange,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col ${label && "gap-1"}`}>
      <label htmlFor={id} className="font-semibold dark:text-white">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`rounded-md px-2 py-1 h-9 border border-tertiary/20 dark:border-slate-600 shadow-sm dark:text-white ${disabled ? "dark:bg-dark select-none" : "dark:bg-[#3c4856]"}`}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}
