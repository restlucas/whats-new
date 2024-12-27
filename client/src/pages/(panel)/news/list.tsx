import { Input } from "@components/input";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CirclesFour,
  PlusCircle,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

interface FilterProps {
  title: string;
  status: string;
}

const status = [
  { id: "draft", name: "Draft" },
  { id: "published", name: "Published" },
  { id: "scheduled", name: "Scheduled" },
  { id: "rejected", name: "Rejected" },
  { id: "pending", name: "Pending approval" },
];

export function List() {
  const [filter, setFilter] = useState<FilterProps>({
    title: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilter((prevState: FilterProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="font-bold mb-10">A list of all your news</h2>

      <div className="w-full flex flex-col gap-6">
        {/* Filters */}
        <div className="flex gap-4 items-center justify-start">
          <div className="w-[300px]">
            <Input
              id="title"
              name="title"
              value={filter.title || ""}
              placeholder="Filter news..."
              handleChange={handleChange}
            />
          </div>
          <div className="relative h-9 px-3 text-sm font-semibold border border-dashed border-tertiary/20 dark:border-tertiary rounded-md flex items-center justify-center gap-3 cursor-pointer duration-100 hover:bg-tertiary/10 dark:hover:bg-tertiary">
            <PlusCircle size={18} weight="bold" />
            <span>Category</span>
          </div>
          <div className="relative h-9 px-3 text-sm font-semibold border border-dashed border-tertiary/20 dark:border-tertiary rounded-md flex items-center justify-center gap-3 cursor-pointer duration-100 hover:bg-tertiary/10 dark:hover:bg-tertiary">
            <PlusCircle size={18} weight="bold" />
            <span>Status</span>
          </div>
          <div className="relative h-9 px-3 text-sm font-semibold border-tertiary/20 dark:border-tertiary rounded-md flex items-center justify-center gap-3 cursor-pointer duration-100 hover:bg-tertiary/10 dark:hover:bg-tertiary">
            <span>Reset </span>
            <X size={14} weight="bold" />
          </div>
        </div>

        {/* Table */}
        <div className=" overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
          <table className="w-full border-collapse rounded-md">
            <thead>
              <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                <th className="p-3 w-[10%]">Category</th>
                <th className="p-3 w-[60%]">Title</th>
                <th className="p-3 w-[10%]">Created At</th>
                <th className="p-3 w-[10%]">Status</th>
                <th className="p-3 w-[10%]"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <tr
                    key={index}
                    className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                  >
                    <td className="border-y border-tertiary/20 dark:border-tertiary p-3">
                      <div className="flex items-center justify-start">
                        <div className="font-semibold border-[1px] border-tertiary/20 dark:border-tertiary rounded-md py-1 px-4">
                          A category
                        </div>
                      </div>
                    </td>
                    <td className="border-y border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline">
                      A title
                    </td>
                    <td className="border-y border-tertiary/20 dark:border-tertiary p-3 ">
                      01/01/2025
                    </td>
                    <td className="border-y border-tertiary/20 dark:border-tertiary p-3 ">
                      Published
                    </td>
                    <td className="border-y border-tertiary/20 dark:border-tertiary p-3 ">
                      <button
                        type="button"
                        className="flex items-center justify-center h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
                      >
                        <CirclesFour size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer options */}
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Showing 10 results of 100</span>

          <div className="flex items-center justify-between gap-12">
            <div className="flex items-center justify-center gap-2">
              <span className="">Results per page</span>
              <div className="px-2 py-1 flex items-center justify-start gap-2 border border-tertiary/20 dark:border-tertiary rounded-md">
                <span>10</span>
                <CaretDown size={16} />
              </div>
            </div>

            <span>Page 1 of 10</span>

            <div className="flex items-center justify-center gap-1">
              <button
                type="button"
                className="flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <CaretDoubleLeft size={14} weight="bold" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <CaretLeft size={14} weight="bold" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <CaretRight size={14} weight="bold" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <CaretDoubleRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
