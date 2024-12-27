import { TableCard } from "@components/cards/table";
import { Article } from "@phosphor-icons/react";

const news = [
  {
    id: "a123",
    href: "",
    title: "A random title article 1",
    publishedAt: "19 nov, 2024",
    views: 1,
  },
  {
    id: "b123",
    href: "",
    title: "A random title article 2",
    publishedAt: "19 nov, 2024",
    views: 3,
  },
  {
    id: "c123",
    href: "",
    title: "A random title article 3",
    publishedAt: "19 nov, 2024",
    views: 5,
  },
  {
    id: "d123",
    href: "",
    title: "A random title article 4",
    publishedAt: "19 nov, 2024",
    views: 7,
  },
  {
    id: "f123",
    href: "",
    title: "A random title article 5",
    publishedAt: "19 nov, 2024",
    views: 9,
  },
];

export function LastFiveNewsPublished() {
  return (
    <TableCard
      title="Last five news published"
      icon={<Article size={20} />}
      tableTitle={["Title", "Published at", "Views"]}
      news={news}
    />
  );
}
