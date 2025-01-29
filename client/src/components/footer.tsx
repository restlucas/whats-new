import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="text-center p-4 w-full h-[120px] bg-slate-700 flex flex-col gap-1 items-center justify-center text-white">
      <p className="font-bold">{"© 2025 What's New. All rights reserved."}</p>
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
  );
}
