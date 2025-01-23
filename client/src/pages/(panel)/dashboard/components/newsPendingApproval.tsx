import { TableCard } from "@src/components/cards/table";
import { HourglassSimpleHigh } from "@phosphor-icons/react";

const news = [
  {
    id: "a123",
    href: "",
    title: "A random title article 1",
    createdAt: "20 nov, 2024",
    responsible: "Admin",
  },
  {
    id: "b123",
    href: "",
    title: "A random title article 2",
    createdAt: "20 nov, 2024",
    responsible: "Admin",
  },
  {
    id: "c123",
    href: "",
    title: "A random title article 3",
    createdAt: "20 nov, 2024",
    responsible: "Admin",
  },
  {
    id: "d123",
    href: "",
    title: "A random title article 4",
    createdAt: "20 nov, 2024",
    responsible: "Admin",
  },
  {
    id: "f123",
    href: "",
    title: "A random title article 5",
    createdAt: "20 nov, 2024",
    responsible: "Admin",
  },
];

export function NewsPendingApproval() {
  return (
    <TableCard
      title="News pending approval"
      icon={<HourglassSimpleHigh size={20} />}
      tableTitle={["Title", "Created at", "Responsible"]}
      news={news}
    />
  );
}
