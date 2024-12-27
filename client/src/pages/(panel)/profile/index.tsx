import { Helmet } from "react-helmet-async";

export function Profile() {
  return (
    <>
      <Helmet title="Profile" />
      <section className="w-full h-full">
        <h1 className="text-vibrant-red font-bold text-2xl">Profile</h1>
      </section>
    </>
  );
}
