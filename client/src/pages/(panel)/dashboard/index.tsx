import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Overview } from "./overview";
import { Notifications } from "./notifications";

export function Dashboard() {
  const [options, setOptions] = useState([
    { name: "Overview", selected: true, component: <Overview /> },
    { name: "Notifications", selected: false, component: <Notifications /> },
  ]);

  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  const handleOption = (optionValues: any) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === optionValues.name
          ? { ...option, selected: true }
          : { ...option, selected: false }
      )
    );

    setSelectedOption(optionValues);
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <section className="w-full h-full flex flex-col gap-8">
        <h1 className="text-vibrant-red font-bold text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-4">
          {/* Options to show */}
          <div className="flex">
            <div className="relative text-sm h-9 bg-tertiary/20 dark:bg-tertiary flex items-center justify-start p-1 rounded-md overflow-hidden">
              <div
                className="absolute top-1 left-1 h-7 bg-light dark:bg-dark rounded-md duration-300"
                style={{
                  width: `calc((100% - 0.5rem) / ${options.length})`,
                  transform: `translateX(${
                    options.findIndex((option) => option.selected) * 100
                  }%)`,
                }}
              />
              {options.map((option, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`w-28 relative z-10 px-3 py-1 font-bold bg-none rounded-md ${!option.selected && "text-black/30 dark:text-light/30"}`}
                    onClick={() => handleOption(option)}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Show the selected component */}
          {selectedOption.component}
        </div>
      </section>
    </>
  );
}
