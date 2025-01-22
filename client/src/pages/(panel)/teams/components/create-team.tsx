import { Input } from "@components/input";
import { PlusCircle } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useTeams } from "../../../../hooks/useTeams";

export function CreateTeam() {
  const { newTeam, loading } = useTeams();
  const { user } = useContext(UserContext);
  const [teamName, setTeamName] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await newTeam(user.id, teamName);

    if (response) {
      alert(response.message);
    }
  };

  return (
    <div className="h-[200px] border-2 rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col items-center justify-center border-dashed gap-6">
      <h4 className="text-xl font-semibold">Create a new team</h4>
      <form
        id="teamNameForm"
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-4"
      >
        <div className="w-[300px]">
          <Input
            id="teamName"
            name="teamName"
            placeholder="Enter a team name..."
            handleChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <button
          className={`w-[150px] flex items-center justify-center gap-2 text-white bg-vibrant-red h-full rounded-md duration-100 hover:bg-vibrant-red/80 ${loading ? "pointer-events-none" : ""}`}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <PlusCircle size={20} />
              <span className="font-semibold">Create</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
