import {
  ArticleNyTimes,
  ChartBar,
  Gear,
  House,
  Info,
  SignOut,
  User,
  Users,
} from "@phosphor-icons/react";
import ThemeToggle from "./themeToggle";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";

const menus = [
  { name: "Dashboard", href: "/panel", icon: <House size={22} /> },
  {
    name: "News management",
    href: "/panel/news",
    icon: <ArticleNyTimes size={22} />,
  },
  {
    name: "Teams",
    href: "/panel/teams",
    icon: <Users size={22} />,
  },
  {
    name: "Support and feedback",
    href: "/panel/support",
    icon: <Info size={22} />,
  },
];

export function Aside() {
  const location = useLocation();
  const { signOut } = useContext(UserContext);

  return (
    <aside className="w-[275px] h-screen py-8 px-4 flex flex-col gap-8">
      <h1 className="text-4xl text-center font-bold text-vibrant-red">
        what's new
      </h1>

      <h3 className="text-sm text-center">
        Welcome <span className="font-bold">restlucas!</span>
      </h3>

      <nav>
        <ul className="flex flex-col items-start justify-center gap-2">
          {menus.map((menu, index) => {
            return (
              <li
                key={index}
                className={`w-full h-full duration-100 rounded-md hover:text-vibrant-red hover:fill-vibrant-red cursor-pointer ${location.pathname === menu.href && "bg-tertiary/10 dark:bg-tertiary text-vibrant-red fill-vibrant-red"}`}
              >
                <Link
                  to={menu.href}
                  className="p-2 rounded-md w-full h-full flex items-center justify-start gap-4"
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex items-center justify-center gap-4">
        <ThemeToggle />

        <Link
          to="profile"
          title="Profile"
          className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
        >
          <User
            size={22}
            className={`${location.pathname === "/panel/profile" && "fill-vibrant-red"}`}
          />
        </Link>

        <button
          onClick={() => signOut()}
          className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
        >
          <SignOut
            size={22}
            className="fill-text-primary cursor-pointer"
            weight="bold"
          />
        </button>
      </div>
      <footer className="text-center flex flex-col gap-1 items-center justify-center text-xs">
        <p className="font-bold">© 2024 What's New. All rights reserved.</p>
        <p>
          by{" "}
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/restlucas/"
            className="font-bold duration-100 hover:underline"
          >
            restlucas
          </Link>
        </p>
      </footer>
    </aside>
  );
}
