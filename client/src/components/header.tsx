import {
  Bell,
  CaretDown,
  List,
  MagnifyingGlass,
  SignOut,
  User,
} from "@phosphor-icons/react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ThemeToggle from "./themeToggle";
import useAuthCheck from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { clearLocalStorage } from "@src/utils/storageUtils";
import { deleteCookie } from "@src/utils/cookieUtils";

export const categories = [
  { value: "general", name: "General" },
  { value: "business", name: "Business" },
  { value: "entertainment", name: "Entertainment" },
  { value: "health", name: "Health" },
  { value: "science", name: "Science" },
  { value: "sports", name: "Sports" },
  { value: "technology", name: "Technology" },
];

const DesktopNavigation = ({
  urlParams,
  authenticated,
}: {
  urlParams: URLSearchParams;
  authenticated: boolean | null;
}) => {
  return (
    <div className="hidden min-[900px]:flex items-center justify-between">
      <div className="h-9 flex items-center justify-start gap-4 2xl:gap-16">
        <Link to="/" className="text-3xl text-nowrap text-title font-bold">
          what's new
        </Link>
        <nav>
          <ul className="flex gap-2 2xl:gap-12">
            {categories.map((category, index) => {
              const params = new URLSearchParams(urlParams.toString());
              params.set("category", category.value);
              const categoryUrl = `/search?${params.toString()}`;

              return (
                <li
                  key={index}
                  className={`h-9 flex items-center justify-center box-content border-b-2 border-transparent font-bold duration-100 text-inherit uppercase ${urlParams.get("category") && urlParams.get("category") === category.value ? "text-red border-red" : "hover:text-title hover:border-red"}`}
                >
                  <Link to={categoryUrl} className="text-sm lg:text-base">
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-end gap-1 sm:gap-4">
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

        <ThemeToggle />

        {authenticated ? (
          <>
            <Link
              to="/panel"
              className="w-auto text-nowrap py-1 px-2 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
            >
              Go to dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="w-auto py-1 px-2 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
            >
              Go to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const MobileNavigation = ({
  urlParams,
  authenticated,
}: {
  urlParams: URLSearchParams;
  authenticated: boolean | null;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleMenu = () => {
    setShowMobileMenu(true);
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

  const makeLogout = async () => {
    await clearLocalStorage();
    await deleteCookie("@whats-new:token");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex min-[900px]:hidden items-center justify-between">
        <div className="h-9 flex items-center justify-start gap-4 2xl:gap-16">
          <Link to="/" className="text-3xl text-nowrap text-title font-bold">
            what's new
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex md:gap-4 2xl:gap-12">
              {categories.map((category, index) => {
                const params = new URLSearchParams(urlParams.toString());
                params.set("category", category.value);
                const categoryUrl = `/search?${params.toString()}`;

                return (
                  <li
                    key={index}
                    className={`h-9 flex items-center justify-center box-content border-b-2 border-transparent font-bold duration-100 text-inherit uppercase ${urlParams.get("category") && urlParams.get("category") === category.value ? "text-red border-red" : "hover:text-title hover:border-red"}`}
                  >
                    <Link to={categoryUrl}>{category.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <button onClick={handleMenu}>
          <List size={32} />
        </button>
      </div>

      {showMobileMenu && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 flex items-center justify-end z-[999]">
          <div
            ref={divRef}
            className={`${isAnimating ? "animate-fade-out" : "animate-fade-in"} px-4 py-8 w-2/3 h-full bg-light dark:bg-dark flex flex-col gap-4`}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
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

              <ThemeToggle />
            </div>
            <nav className="w-full h-full flex flex-col">
              <h3 className="w-full text-center text-sm font-bold mb-4">
                Categories
              </h3>
              <ul className="flex flex-col items-start justify-center gap-2">
                {categories.map((category, index) => {
                  const params = new URLSearchParams(urlParams.toString());
                  params.set("category", category.value);
                  const categoryUrl = `/search?${params.toString()}`;

                  return (
                    <li
                      key={index}
                      className={`h-9 flex items-center justify-center box-content border-b-2 border-transparent font-bold duration-100 text-inherit uppercase ${urlParams.get("category") && urlParams.get("category") === category.value ? "text-red border-red" : "hover:text-title hover:border-red"}`}
                    >
                      <Link to={categoryUrl}>{category.name}</Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex items-center justify-center gap-2">
                {authenticated ? (
                  <>
                    <Link
                      to="/panel"
                      className="w-auto h-12 text-nowrap px-4 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
                    >
                      Go to dashboard
                    </Link>
                    <button
                      onClick={() => makeLogout()}
                      className="h-12 w-12 flex items-center justify-center rounded-md border border-tertiary/20 dark:border-tertiary"
                    >
                      <SignOut size={22} className="" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth"
                      className="w-auto h-12 text-nowrap px-4 rounded-md bg-red-vibrant text-white font-bold flex items-center justify-center duration-100 hover:bg-red-hover"
                    >
                      Go to login
                    </Link>
                  </>
                )}
              </div>
            </nav>

            <div className="mt-auto flex items-center justify-center gap-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export function Header() {
  const isAuthenticated = useAuthCheck();
  const [searchParams] = useSearchParams();

  return (
    <header className="dark:text-white text-primary py-6 mx-4 xl:mx-36">
      <DesktopNavigation
        urlParams={searchParams}
        authenticated={isAuthenticated}
      />

      <MobileNavigation
        urlParams={searchParams}
        authenticated={isAuthenticated}
      />
    </header>
  );
}
