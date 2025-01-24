import { ArrowRight, Clock } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { TechNews } from "./components/techNews";
import { TrendingNews } from "./components/trendingNews";
import { TodaysNews } from "./components/todaysNews";

export function Home() {
  return (
    <>
      <Helmet title="Home" />

      {/* Today's news */}
      <section className="w-full h-auto">
        <h1 className="font-bold text-4xl mb-10">
          <span className="text-title">#Today's</span> News in your region
        </h1>
        <TodaysNews />
      </section>

      {/* Trending news */}
      <section>
        <h1 className="font-bold text-4xl mb-14">
          <span className="text-title">#Trending</span> News
        </h1>
        <TrendingNews />
      </section>

      {/* Tech's news */}
      <section>
        <div className="flex items-center justify-between mb-14">
          <h1 className="font-bold text-4xl">
            <span className="text-title">#Tech's</span> News
          </h1>
          <Link
            to="/search?category=technology"
            className="text-xl font-bold uppercase flex items-center justify-end gap-2 duration-100 hover:text-red hover:fill-red"
          >
            <ArrowRight size={20} weight="bold" />
            <span className="text-sm sm:text-base">See all</span>
          </Link>
        </div>
        <TechNews />
      </section>

      {/* Resources */}
      {/* Tech news */}
      {/* Today's image gallery */}
    </>
  );
}
