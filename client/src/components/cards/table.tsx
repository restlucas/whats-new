import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ShortNews {
  id: string;
  href: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  views?: number;
  responsible?: string;
}

interface TableProps {
  title: string;
  tableTitle: string[];
  news: ShortNews[];
  icon: ReactNode;
}

export function TableCard({ title, tableTitle, news, icon }: TableProps) {
  return (
    <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {icon}
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm font-semibold w-full overflow-x-scroll text-left rtl:text-right">
            <th className="p-2 w-9/12">{tableTitle[0]}</th>
            <th className="p-2 w-2/12">{tableTitle[1]}</th>
            <th className="p-2 w-2/12">{tableTitle[2]}</th>
          </tr>
        </thead>
        <tbody className="">
          {news.map((article) => {
            return (
              <tr
                key={article.id}
                className="text-sm hover:bg-tertiary/20 hover:dark:bg-tertiary"
              >
                <td className="p-2">
                  <Link
                    to={article.href}
                    className="line-clamp-1 cursor-pointer hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="p-2">
                  {article.publishedAt || article.createdAt}
                </td>
                <td className="p-2">{article.views || article.responsible}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
