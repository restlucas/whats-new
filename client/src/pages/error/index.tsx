import { Link } from "react-router-dom";

export function Error() {
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="w-[400px] rounded-2xl shadow-2xl p-6 text-primary dark:text-light bg-[#ededed] dark:bg-tertiary overflow-hidden">
        <h1 className="font-bold text-4xl text-gray-700 dark:text-light text-center">
          Error
        </h1>

        <h3 className="text-gray-700 dark:text-light text-sm text-center mt-5 opacity-50">
          Message
        </h3>

        <p className="text-gray-700 dark:text-light font-bold text-center mt-2 opacity-50">
          {message}
        </p>

        <Link
          to={"/"}
          className="mt-10 w-full flex items-center justify-center font-bold text-gray-700 dark:text-light duration-200 hover:underline"
        >
          Get back
        </Link>
      </div>
    </section>
  );
}
