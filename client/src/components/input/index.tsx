interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  handleChange,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col ${label && "gap-1"}`}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="rounded-md px-2 py-1 h-9 dark:bg-[#3c4856] border border-tertiary/20 dark:border-slate-600"
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        {...rest}
      />
    </div>
  );
}
