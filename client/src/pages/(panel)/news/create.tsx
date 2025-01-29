import { NewsForm } from "./components/form";

export function Create() {
  return (
    <div>
      <h2 className="font-bold mb-10">Fill in all the fields on the form</h2>
      <NewsForm action="post" />
    </div>
  );
}
