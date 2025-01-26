import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Skeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 min-[1200px]:grid-cols-2 gap-4">
      {Array.from({ length: 24 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex gap-2 rounded-md border border-tertiary/20 dark:border-tertiary p-2"
          >
            <div className="hidden sm:block aspect-square h-[180px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="w-full h-6 sm:h-8 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="w-[200px] h-6 sm:h-8 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="w-full h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="w-full h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="w-full h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="w-full h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </div>
              <div className="w-full flex items-center justify-end">
                <div className="w-[100px] h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function LikedNews() {
  return (
    <>
      <Helmet title="Liked news" />
      <section className="w-full space-y-6 mb-12">
        <h1 className="font-bold text-4xl text-red-vibrant mb-6">Liked news</h1>

        {1 !== 1 ? (
          <Skeleton />
        ) : (
          <div className="w-full grid grid-cols-1 min-[1200px]:grid-cols-2 gap-4">
            {Array.from({ length: 24 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 rounded-md border border-tertiary/20 dark:border-tertiary p-2 duration-200 hover:shadow-md"
                >
                  <div className="hidden sm:block aspect-square h-[180px] bg-slate-200 rounded-md relative overflow-hidden cursor-pointer group">
                    <div className="hidden duration-200 group-hover:flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-red-vibrant/70">
                      <ThumbsDown
                        size={40}
                        className="fill-white"
                        weight="fill"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Link
                      to=""
                      className="text-lg sm:text-2xl font-bold duration-200 hover:underline"
                    >
                      Creber crebro termes aut virgo ex vulpes ubi ventosus
                      impedit.
                    </Link>
                    <p className="flex-1 text-sm line-clamp-3 xl:line-clamp-6">
                      Conqueror adsuesco apparatus amita suppellex atrocitas
                      bene tergum cursus tenus temperantia illo suffoco brevis
                      consectetur auctus reiciendis maxime defluo officia patria
                      aranea autus vel adeptio tribuo ante admoneo dens
                      quisquam. Conqueror adsuesco apparatus amita suppellex
                      atrocitas bene tergum cursus tenus temperantia illo
                      suffoco brevis consectetur auctus reiciendis maxime defluo
                      officia patria aranea autus vel adeptio tribuo ante
                      admoneo dens quisquam.
                    </p>
                    <div className="w-full flex items-center justify-end">
                      <span className="text-xs font-semibold">01/25/2025</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
