import { Bell, CaretDown, MagnifyingGlass, User } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";
import ThemeToggle from "./themeToggle";
import useAuthCheck from "../hooks/useAuth";

export const categories = [
  { value: "general", name: "General" },
  { value: "business", name: "Business" },
  { value: "entertainment", name: "Entertainment" },
  { value: "health", name: "Health" },
  { value: "science", name: "Science" },
  { value: "sports", name: "Sports" },
  { value: "technology", name: "Technology" },
];

export function Header() {
  const isAuthenticated = useAuthCheck();
  const [searchParams] = useSearchParams();

  return (
    <header className="dark:text-white text-primary py-6 flex items-center justify-between mx-8 md:mx-12 xl:mx-36">
      <div className="h-9 flex items-center justify-start gap-4 2xl:gap-16">
        <Link to="/" className="text-3xl text-nowrap text-title font-bold">
          what's new
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex md:gap-4 2xl:gap-12">
            {categories.map((category, index) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("category", category.value);
              const categoryUrl = `/search?${params.toString()}`;

              return (
                <li
                  key={index}
                  className={`h-9 flex items-center justify-center box-content border-b-2 border-transparent font-bold duration-100 text-inherit uppercase ${searchParams.get("category") && searchParams.get("category") === category.value ? "text-red border-red" : "hover:text-title hover:border-red"}`}
                >
                  <Link to={categoryUrl}>{category.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link
          to="/search"
          className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
        >
          <MagnifyingGlass
            size={22}
            className="fill-text-primary cursor-pointer"
            weight="bold"
          />
        </Link>

        <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary">
          <Bell
            size={22}
            className="fill-text-primary cursor-pointer"
            weight="bold"
          />
        </div>

        <ThemeToggle />

        {isAuthenticated ? (
          <Link
            to="/panel"
            className="w-auto text-nowrap py-1 px-2 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
          >
            Go to dashboard
          </Link>
        ) : (
          <Link
            to="/auth"
            className="w-auto py-1 px-2 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
          >
            Go to login
          </Link>
        )}
      </div>
    </header>
  );
}
