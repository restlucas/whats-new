import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { List } from "./list";
import { Create } from "./create";
import { EditHistory } from "./edit-history";

const options = [
  { name: "List", component: <List /> },
  { name: "Edit history", component: <EditHistory /> },
  { name: "Create", component: <Create /> },
];
export function News() {
  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  const handleOption = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Helmet title="News" />
      <section className="w-full h-full flex flex-col gap-8">
        <h1 className="text-vibrant-red font-bold text-2xl">News</h1>
        <div className="flex flex-col gap-4">
          {/* Options to show */}
          <div className="flex">
            <div className="flex items-center justify-start gap-2">
              {options.map((option, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`font-bold py-1 px-4 rounded-lg ${selectedOption.name === option.name ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary" : "text-black/30 dark:text-light/30"}`}
                    onClick={() => handleOption(option)}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
            {selectedOption.component}
          </div>
        </div>
      </section>
    </>
  );
}
