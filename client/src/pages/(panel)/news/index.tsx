import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { List } from "./list";
import { Create } from "./create";
import { EditHistory } from "./edit-history";
import { Edit } from "./edit";

export function News() {
  const handleOption = (optionName: any) => {
    const selectedOption = options.find((option) => option.name === optionName);
    setSelectedOption(selectedOption);
  };

  const options = [
    {
      name: "List",
      component: <List />,
      visible: true,
    },
    { name: "Edit history", component: <EditHistory />, visible: true },
    { name: "Create", component: <Create />, visible: true },
  ];

  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  return (
    <>
      <Helmet title="News" />
      <section className="w-full h-full flex flex-col gap-8">
        <h1 className="text-red-vibrant font-bold text-2xl">News</h1>
        <div className="flex flex-col gap-4">
          {/* Options to show */}
          <div className="flex">
            <div className="flex items-center justify-start gap-2">
              {options.map((option, index) => {
                if (option.visible) {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`font-bold py-1 px-4 rounded-lg ${
                        selectedOption && selectedOption.name === option.name
                          ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary"
                          : "text-black/30 dark:text-light/30"
                      }`}
                      onClick={() => handleOption(option.name)}
                    >
                      {option.name}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {selectedOption && (
            <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2 mb-20">
              {selectedOption.component}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
