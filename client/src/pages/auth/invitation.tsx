import { validateInvitation } from "@src/services/authServices";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

export function Invitation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [loading, setLoading] = useState<boolean>(true);

  const checkInvite = async (token: string) => {
    const response = await validateInvitation(token);

    alert(response.message);
    navigate(response.redirect);

    // if (response.data.message !== "Token is valid") {
    //   url.search = "";
    //   window.history.replaceState({}, "", url.toString());
    //   navigate("/error?message=Invalid%20invitation");
    // }
  };

  useEffect(() => {
    if (token) {
      checkInvite(token);
    }
  }, []);

  return (
    <>
      <Helmet title="Invitation" />
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 mx-6 w-full md:w-1/2 xl:w-1/3 rounded-md border border-tertiary/20 dark:border-tertiary h-auto p-8 shadow-md">
          <h1 className="font-bold text-4xl text-red-vibrant mb-6">
            Invitation
          </h1>

          <p>só eu sei</p>
        </div>
      </section>
    </>
  );
}
