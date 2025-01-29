import {
  ArticleNyTimes,
  House,
  List,
  Question,
  SignOut,
  User,
  Users,
} from "@phosphor-icons/react";
import ThemeToggle from "./themeToggle";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TeamsButton } from "./button/teams";

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
];

export function PanelNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useContext(UserContext);

  const [isAnimating, setIsAnimating] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleMenu = () => {
    setShowMobileMenu(true);
  };

  const handleNavigate = (to: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowMobileMenu(false);
      setIsAnimating(false);
    }, 150);
    navigate(to);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowMobileMenu(false);
        setIsAnimating(false);
      }, 150);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden md:flex w-[275px] h-screen py-8 px-4 flex-col gap-8">
        <Link
          to="/"
          className="text-4xl text-center font-bold text-red-vibrant"
        >
          {"what's new"}
        </Link>

        <h3 className="text-sm text-center">
          Welcome <span className="font-bold">{user?.name || "..."}!</span>
        </h3>

        <TeamsButton />

        <nav>
          <ul className="flex flex-col items-start justify-center gap-2">
            {menus.map((menu, index) => {
              return (
                <li
                  key={index}
                  className={`w-full h-full duration-100 rounded-md hover:text-red-vibrant hover:fill-red-vibrant cursor-pointer ${location.pathname === menu.href && "bg-tertiary/10 dark:bg-tertiary text-red-vibrant fill-red-vibrant"}`}
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
            to="/my-profile"
            title="Profile"
            className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            <User size={22} weight="bold" />
          </Link>

          <Link
            to="/support"
            title="Support and FAQ"
            className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            <Question size={22} weight="bold" />
          </Link>

          <button
            onClick={() => signOut("Logged out successfully.")}
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
          <p className="font-bold">
            {"© 2024 What's New. All rights reserved."}
          </p>
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

      {/* Mobile Navigation */}
      <div className="flex md:hidden w-full h-auto px-4 pt-8 pb-4 items-start justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-start">
            Welcome <span className="font-bold">{user?.name || "..."}!</span>
          </Link>

          <TeamsButton />
          {/* <div className="relative">
            {loading ? (
              <div className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-vibrant/50 text-white">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            ) : teams && teams.length > 0 ? (
              <button
                onClick={() => setShowingTeams(!showingTeams)}
                className="w-full h-10 flex items-center justify-center cursor-pointer group"
              >
                <div className="border border-r-0 border-tertiary/20 dark:border-tertiary w-full h-full px-2 flex-1 rounded-tl-md rounded-bl-md flex items-center justify-start duration-200 group-hover:text-white group-hover:bg-red-vibrant">
                  <span className="font-bold">{activeTeam?.name}</span>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-tr-md rounded-br-md bg-red-vibrant">
                  <CaretLeft
                    size={22}
                    weight="bold"
                    fill="white"
                    className="duration-200 group-hover:-rotate-90 "
                  />
                </div>
              </button>
            ) : (
              <Link
                to="/panel/teams"
                className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-vibrant/50 text-white"
              >
                <span className="font-bold">Create a team</span>
                <Plus size={22} />
              </Link>
            )}

            {showingTeams && (
              <div className="border border-tertiary/20 dark:border-tertiary h-auto absolute flex flex-col items-center justify-center top-full mt-1 right-0 left-0 z-100 rounded-md shadow-md bg-light dark:bg-dark">
                {teams &&
                  teams
                    .filter((team: Team) => team.id !== activeTeam?.id)
                    .map((team: Team) => {
                      return (
                        <button
                          key={team.id}
                          onClick={() => changeTeam(team.id)}
                          className="h-10 w-full p-2 text-start duration-200 hover:bg-tertiary/5 hover:dark:bg-tertiary/60 font-bold"
                        >
                          {team.name}
                        </button>
                      );
                    })}
              </div>
            )}
          </div> */}
        </div>

        <button
          onClick={handleMenu}
          className="p-2 rounded-md flex items-center justify-center bg-tertiary/10 dark:bg-tertiary cursor-pointer"
        >
          <List size={32} />
        </button>
      </div>

      {showMobileMenu && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 flex items-center justify-end z-[999]">
          <div
            ref={divRef}
            className={`${isAnimating ? "animate-fade-out" : "animate-fade-in"} px-4 py-8 w-2/3 h-full bg-light dark:bg-dark flex flex-col gap-4`}
          >
            <h1 className="text-4xl text-center font-bold text-red-vibrant">
              {"what's new"}
            </h1>

            <nav>
              <ul className="flex flex-col items-start justify-center gap-2">
                {menus.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      className={`w-full h-full duration-100 rounded-md hover:text-red-vibrant hover:fill-red-vibrant cursor-pointer ${location.pathname === menu.href && "bg-tertiary/10 dark:bg-tertiary text-red-vibrant fill-red-vibrant"}`}
                    >
                      <button
                        onClick={() => handleNavigate(menu.href)}
                        className="p-2 rounded-md w-full h-full flex items-center justify-start gap-4"
                      >
                        {menu.icon}
                        <span>{menu.name}</span>
                      </button>
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
                  className={`${location.pathname === "/panel/profile" && "fill-red-vibrant"}`}
                />
              </Link>

              <button
                onClick={() => signOut("Logged out successfully.")}
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
              <p className="font-bold">
                {"© 2024 What's New. All rights reserved."}
              </p>
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
          </div>
        </div>
      )}
    </>
  );
}
