import {
  CaretDown,
  House,
  List,
  MagnifyingGlass,
  Newspaper,
  Question,
  SignOut,
  ThumbsUp,
  User,
  UserGear,
} from "@phosphor-icons/react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ThemeToggle from "./themeToggle";
import useAuthCheck from "../hooks/useAuthCheck";
import { useContext, useEffect, useRef, useState } from "react";
import { clearLocalStorage, getLocalStorage } from "@src/utils/storageUtils";
import { deleteCookie } from "@src/utils/cookieUtils";
import { UserContext } from "@src/contexts/UserContext";

interface UserProps {
  id: string;
  username: string;
  name: string;
  role: "READER" | "CREATOR" | "ADMIN";
  email: string;
  createdAt: string;
}

export const categories = [
  { value: "general", name: "General" },
  { value: "business", name: "Business" },
  { value: "entertainment", name: "Entertainment" },
  { value: "health", name: "Health" },
  { value: "science", name: "Science" },
  { value: "sports", name: "Sports" },
  { value: "technology", name: "Technology" },
];

const loggedNavigation = {
  CREATOR: [
    {
      name: "Dashboard",
      href: "/panel",
      icon: <House size={22} weight="fill" className="fill-white" />,
    },
    // {
    //   name: "Liked news",
    //   href: "/liked-news",
    //   icon: <ThumbsUp size={22} weight="fill" className="fill-white" />,
    // },
  ],
  READER: [
    {
      name: "My profile",
      href: "/my-profile",
      icon: <User size={22} weight="fill" className="fill-white" />,
    },
    // {
    //   name: "Liked news",
    //   href: "/liked-news",
    //   icon: <ThumbsUp size={22} weight="fill" className="fill-white" />,
    // },
  ],
  ADMIN: [
    {
      name: "Dashboard",
      href: "/panel",
      icon: <House size={22} weight="fill" className="fill-white" />,
    },
    // {
    //   name: "Liked news",
    //   href: "/liked-news",
    //   icon: <ThumbsUp size={22} weight="fill" className="fill-white" />,
    // },
  ],
};

const LoggedOptions = ({
  user,
  setShowMobileMenu,
}: {
  user: UserProps;
  setShowMobileMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [loggedOptions, setLoggedOptions] = useState<boolean>(false);
  const { signOut } = useContext(UserContext);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setLoggedOptions(false);
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
      {/* Desktop */}
      <div ref={divRef} className="relative hidden min-[900px]:block">
        <button
          onClick={() => setLoggedOptions(!loggedOptions)}
          className="py-2 px-4 rounded-md bg-red-vibrant font-bold flex items-center justify-center gap-4"
        >
          <span className="text-white">{user.name.split(" ")[0]}</span>
          <CaretDown
            size={22}
            weight="bold"
            className={`fill-white duration-300 ${loggedOptions ? "rotate-0" : "rotate-90"}`}
          />
        </button>

        {loggedOptions && (
          <div className="animate-fade-yaxis absolute z-[100] top-full mt-1 right-0 flex flex-col rounded-md bg-red-vibrant text-white overflow-hidden">
            {loggedNavigation[user.role].map((navigation, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setLoggedOptions(false);
                    navigate(navigation.href);
                  }}
                  className="text-end font-semibold py-2 px-5 duration-200 hover:bg-red-hover text-nowrap flex items-center justify-between gap-4"
                >
                  <span>{navigation.name}</span>
                  {navigation.icon}
                </button>
              );
            })}
            <button
              onClick={() => {
                setLoggedOptions(false);
                signOut("Logged out successfully.");
              }}
              className="text-end font-semibold py-2 px-5 duration-200 hover:bg-red-hover text-nowrap flex items-center justify-between gap-4"
            >
              <span>Sign out</span>
              <SignOut
                size={22}
                className="fill-text-primary cursor-pointer"
                weight="bold"
              />
            </button>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="w-full flex items-center justify-center gap-2 min-[900px]:hidden">
        {loggedNavigation[user.role].map((navigation, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setLoggedOptions(false);
                setShowMobileMenu && setShowMobileMenu(false);
                navigate(navigation.href);
              }}
              className="h-10 w-10 duration-200 bg-red-hover flex items-center justify-center rounded-md"
            >
              {navigation.icon}
            </button>
          );
        })}
        <button
          onClick={() => signOut("Logged out successfully.")}
          className="h-10 w-10 duration-200 bg-red-hover flex items-center justify-center rounded-md"
        >
          <SignOut
            size={22}
            className="fill-text-primary cursor-pointer fill-white"
            weight="bold"
          />
        </button>
      </div>
    </>
  );
};

const EntranceOptions = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [entranceOptions, setEntranceOptions] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setEntranceOptions(false);
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
      {/* Desktop */}
      <div ref={divRef} className="relative hidden min-[900px]:block">
        <button
          onClick={() => setEntranceOptions(!entranceOptions)}
          className="py-2 px-4 text-nowrap rounded-md bg-red-vibrant font-bold text-white"
        >
          Go to login
        </button>

        {entranceOptions && (
          <div className="animate-fade-yaxis absolute z-[100] top-full mt-1 right-0 flex flex-col rounded-md bg-red-vibrant text-white overflow-hidden">
            <Link
              to="/auth/reader"
              className="py-2 px-5 font-semibold duration-200 hover:bg-red-hover text-nowrap flex items-center justify-between gap-4"
            >
              <span>as a Reader</span>
              <Newspaper size={18} weight="bold" />
            </Link>
            <Link
              to="/auth/creator"
              className="text-end font-semibold py-2 px-5 duration-200 hover:bg-red-hover text-nowrap flex items-center justify-between gap-4"
            >
              <span>as a Creator</span>
              <UserGear size={18} weight="bold" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex min-[900px]:hidden">
        <div className="flex flex-col gap-2">
          <Link
            to="/auth/reader"
            className="py-2 px-5 font-semibold duration-200 bg-red-hover text-white text-nowrap flex items-center justify-between gap-4 rounded-md"
          >
            <span>as a Reader</span>
            <Newspaper size={18} weight="bold" />
          </Link>
          <Link
            to="/auth/creator"
            className="text-end font-semibold py-2 px-5 duration-200 bg-red-hover text-white text-nowrap flex items-center justify-between gap-4 rounded-md"
          >
            <span>as a Creator</span>
            <UserGear size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </>
  );
};

const DesktopNavigation = ({
  urlParams,
}: {
  urlParams: URLSearchParams;
  authenticated: boolean | null;
}) => {
  const { user } = useContext(UserContext);

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

        <Link
          to="/support"
          className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
        >
          <Question size={22} className="fill-text-primary cursor-pointer" />
        </Link>

        {user ? <LoggedOptions user={user} /> : <EntranceOptions />}

        {/* {authenticated ? (
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
        )} */}
      </div>
    </div>
  );
};

const MobileNavigation = ({
  urlParams,
}: {
  urlParams: URLSearchParams;
  authenticated: boolean | null;
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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

              <Link
                to="/support"
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
              >
                <Question
                  size={26}
                  className="fill-text-primary cursor-pointer"
                />
              </Link>
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
                      <button
                        onClick={() => {
                          setShowMobileMenu(false);
                          navigate(categoryUrl);
                        }}
                      >
                        {category.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex items-center justify-center">
                {user ? (
                  <LoggedOptions
                    user={user}
                    setShowMobileMenu={setShowMobileMenu}
                  />
                ) : (
                  <EntranceOptions />
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
  const { isAuthenticated, loading } = useAuthCheck();
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
