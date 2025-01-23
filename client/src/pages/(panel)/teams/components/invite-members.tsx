import { format, parseISO } from "date-fns";
import { Input } from "@src/components/input";
import { ArrowClockwise, X } from "@phosphor-icons/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { TeamContext } from "@src/contexts/TeamContext";
import {
  getMemberInvitations,
  revokeInvitation,
  sendInvitation,
} from "@src/services/teamsServices";

interface MemberInvitations {
  id: string;
  email: string;
  createdAt: string;
}

export function InviteMembers() {
  const { activeTeam } = useContext(TeamContext);
  const [userEmail, setUserEmail] = useState<string>("");
  const [memberInvitations, setMemberInvitations] = useState<
    MemberInvitations[] | []
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInvitations, setLoadingInvitations] = useState<boolean>(true);

  const getInvitations = async () => {
    setLoadingInvitations(true);
    const teamId = activeTeam ? activeTeam.id : "123";
    const response = await getMemberInvitations(teamId);

    setMemberInvitations(response.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoadingInvitations(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (activeTeam && userEmail) {
      try {
        await sendInvitation(activeTeam.id, userEmail);
        alert("Usuário convidado com sucesso!");
        getInvitations();
      } catch (error) {
        alert(`${error}`);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const cancelInvite = async (inviteId: string, userEmail: string) => {
    const areYouSure = confirm(`Revoke invite to ${userEmail}?`);

    if (areYouSure) {
      await revokeInvitation(inviteId);
      getInvitations();
    }
  };

  useEffect(() => {
    if (activeTeam) getInvitations();
  }, []);

  return (
    <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
      <div className="px-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold leading-4">
            Invite members to{" "}
            <span className="font-bold text-vibrant-red">
              {activeTeam?.name || ""}
            </span>
          </h2>
          <span className="text-sm">
            Invite your team members to collaborate.
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex items-center justify-start gap-4"
        >
          <div className="w-[300px]">
            <Input
              id="userEmail"
              name="userEmail"
              placeholder="User email"
              value={userEmail || ""}
              type="email"
              handleChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="h-9 w-[170px] bg-vibrant-red rounded-md text-nowrap text-xs md:text-sm text-center text-white font-semibold duration-100 hover:bg-vibrant-red/50"
          >
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            ) : (
              <span>Send invite link</span>
            )}
          </button>
        </form>

        <div className="space-y-3">
          <h3 className="font-semibold mt-6">
            Invitations awaiting acceptance
          </h3>

          <div className="overflow-x-scroll md:overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
            <table className="w-full border-collapse rounded-md">
              <thead>
                <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                  <th className="p-3 w-[60%]">Email</th>
                  <th className="p-3 w-[20%] text-nowrap">Invitation date</th>
                  <th className="p-3 w-[20%]"></th>
                </tr>
              </thead>
              <tbody>
                {loadingInvitations ? (
                  <tr>
                    <td
                      className="h-20 text-center text-sm italic font-bold"
                      colSpan={3}
                    >
                      <div className="flex w-full items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    </td>
                  </tr>
                ) : memberInvitations.length > 0 ? (
                  memberInvitations.map((memberInvite, index) => {
                    return (
                      <tr
                        key={memberInvite.id}
                        className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                      >
                        <td
                          className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                        >
                          <span>{memberInvite.email}</span>
                        </td>
                        <td
                          className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                        >
                          {format(
                            parseISO(memberInvite.createdAt),
                            "yyyy-MM-dd"
                          )}
                        </td>
                        <td
                          className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <button
                              title="Resend invitation"
                              type="button"
                              onClick={() =>
                                confirm(
                                  `Resend invite to ${memberInvite.email}?`
                                )
                              }
                              className="flex items-center justify-center gap-2 h-8 px-3 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
                            >
                              <span className="font-semibold">Resend</span>
                              <ArrowClockwise size={16} weight="bold" />
                            </button>
                            <button
                              title="Resend invitation"
                              type="button"
                              onClick={() =>
                                cancelInvite(
                                  memberInvite.id,
                                  memberInvite.email
                                )
                              }
                              className="flex items-center justify-center gap-2 h-8 px-3 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
                            >
                              <span className="font-semibold">Revoke</span>
                              <X size={16} weight="bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="">
                    <td
                      className="h-20 text-center text-sm italic font-bold"
                      colSpan={3}
                    >
                      No Invitations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
