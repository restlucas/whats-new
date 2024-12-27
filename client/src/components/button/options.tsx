import { useEffect, useRef, useState } from "react";

interface OptionsButtonProps {
  memberId: string;
  selectedValue: any;
  icon: any;
  options: any;
  disabled?: boolean;
  handleRole: (memberId: string, roleValue: string) => void;
}

export function OptionsButton({
  memberId,
  selectedValue,
  icon,
  options,
  disabled,
  handleRole,
}: OptionsButtonProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showingOptions, setShowingOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    if (!isVisible) {
      setIsVisible(true);
      setTimeout(() => setShowingOptions(true), 10);
    } else {
      setShowingOptions(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowingOptions(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    setIsVisible(false);
  }, [selectedValue]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleVisibility}
        className={`w-[100px] h-9 rounded-md border border-tertiary/20 dark:border-tertiary flex items-center justify-center gap-3 
          ${disabled && "pointer-events-none  text-primary/50 dark:text-white/50"}
          `}
      >
        <span className="font-semibold">
          {selectedValue.charAt(0).toUpperCase() +
            selectedValue.slice(1).toLowerCase()}
        </span>
        {icon}
      </button>

      {isVisible && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 top-full right-0 w-[300px] mt-1 flex flex-col items-start justify-center gap-1 p-1 rounded-md bg-light dark:bg-[#3c4856] border border-tertiary/20 dark:border-tertiary shadow-md transform transition-all duration-200 ease-out ${
            showingOptions ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {options.map(
            (
              option: { value: string; name: string; description: string },
              index: number
            ) => (
              <button
                key={index}
                onClick={() =>
                  handleRole(memberId as string, option.value as string)
                }
                className="px-5 py-2 flex flex-col gap-1 w-full cursor-pointer duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <h5 className="font-semibold">{option.name}</h5>
                <span className="text-sm">{option.description}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
