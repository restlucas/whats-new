import { TeamContext } from "@src/contexts/TeamContext";
import { fetchEditHistoryByTeam } from "@src/services/newsServices";
import { parseISO, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HistoryProps {
  id: string;
  createdAt: string;
  news: {
    title: string;
    slug: string;
  };
  teamMember: {
    user: {
      name: string;
      image: string;
    };
  };
}

const clientUrl = import.meta.env.VITE_WHATSNEW_CLIENT_URL;

export function EditHistory() {
  const { activeTeam } = useContext(TeamContext);
  const [editHistory, setEditHistory] = useState<HistoryProps[] | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEditHistory = async (teamId: string) => {
    const response = await fetchEditHistoryByTeam(teamId);

    setEditHistory(response);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    if (activeTeam) fetchEditHistory(activeTeam.id);
  }, [activeTeam]);

  return (
    <div className="w-full flex flex-col">
      <h2 className="font-bold mb-10">
        News edit history for{" "}
        <span className="text-red-vibrant">{activeTeam?.name}</span>
      </h2>

      <div className="overflow-x-scroll xl:overflow-hidden">
        <table className="w-full border-collapse rounded-md">
          <thead className="bg-tertiary/10 dark:bg-tertiary/60">
            <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
              <th className="p-3 w-[10%]">Created At</th>
              <th className="p-3 w-[65%]">Article link</th>
              <th className="p-3 w-[25%]">Modified by</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => {
                return (
                  <tr key={index} className="">
                    <td className="p-3">
                      <div className="h-6 w-full bg-tertiary/20 dark:bg-tertiary animate-pulse rounded-md" />
                    </td>
                    <td className="p-3">
                      <div className="h-6 w-2/3 bg-tertiary/20 dark:bg-tertiary animate-pulse rounded-md" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-start gap-2">
                        <div className="h-9 w-9 rounded-full bg-tertiary/20 dark:bg-tertiary animate-pulse " />
                        <div className="flex-1 h-6 w-full bg-tertiary/20 dark:bg-tertiary rounded-md" />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : editHistory ? (
              editHistory.map((article, index) => {
                return (
                  <tr
                    key={index}
                    className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                  >
                    <td className="font-semibold text-nowrap p-3">
                      {format(parseISO(article.createdAt), "MM/dd/yyyy hh:mm")}
                    </td>
                    <td className=" text-nowrap p-3">
                      <Link
                        target="_blank"
                        to={`${clientUrl + "article/" + article.news.slug}`}
                        className=" cursor-pointer duration-100 hover:underline font-semibold"
                      >
                        {article.news.title}
                      </Link>
                    </td>
                    <td className="p-3 text-nowrap flex items-center justify-start gap-2">
                      <div
                        className={`rounded-full h-9 w-9 bg-tertiary/20 dark:bg-tertiary relative flex items-center justify-center overflow-hidden bg-cover bg-center`}
                        style={{
                          backgroundImage:
                            article.teamMember.user.image &&
                            `url(${article.teamMember.user.image})`,
                        }}
                      >
                        {!article.teamMember.user.image && (
                          <span className="text-sm font-semibold">
                            {article.teamMember.user.name
                              .split(" ")
                              .map((part: string) => part[0].toUpperCase())
                              .join("")
                              .slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold">
                        {article.teamMember.user.name}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>not to show</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
