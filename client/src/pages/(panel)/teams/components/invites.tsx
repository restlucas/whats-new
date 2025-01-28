import { format, parseISO } from "date-fns";
import { Input } from "@src/components/input";
import { ArrowClockwise, Check, X } from "@phosphor-icons/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  getMemberInvitations,
  getTeamInvitations,
  handleTeamInvitation,
  revokeInvitation,
  sendInvitation,
} from "@src/services/teamsServices";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface MemberInvitations {
  id: string;
  createdAt: string;
  user: {
    email: string;
  };
}

interface TeamInvitations {
  id: string;
  createdAt: string;
  team: {
    name: string;
  };
}

interface SelectedTeamProps {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export function Invites({ selectedTeam }: { selectedTeam: SelectedTeamProps }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    userEmail: "",
    memberInvitations: [] as MemberInvitations[],
    teamInvitations: [] as TeamInvitations[],
    loading: {
      memberInvitations: false,
      teamInvitations: false,
    },
  });

  const updateState = (updates: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const fetchMemberInvitations = async () => {
    updateState({ loading: { ...state.loading, memberInvitations: true } });
    try {
      const teamId = selectedTeam?.id || "123";
      const response = await getMemberInvitations(teamId);
      updateState({ memberInvitations: response.data });
    } catch (error) {
      console.error("Error on fetch member invitations:", error);
    } finally {
      updateState({ loading: { ...state.loading, memberInvitations: false } });
    }
  };

  const fetchTeamInvitations = async () => {
    updateState({ loading: { ...state.loading, teamInvitations: true } });
    try {
      const userEmail = user?.email || "123";
      const response = await getTeamInvitations(userEmail);
      updateState({ teamInvitations: response.data });
    } catch (error) {
      console.error("Error or fetch team invitations:", error);
    } finally {
      updateState({ loading: { ...state.loading, teamInvitations: false } });
    }
  };

  const handleCancelInvite = async (inviteId: string, email: string) => {
    if (confirm(`Revoke invite to ${email}?`)) {
      try {
        await revokeInvitation(inviteId);
        fetchMemberInvitations();
      } catch (error) {
        console.error("Error on decline invitation:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ userEmail: e.target.value });
  };

  const handleInvitationAction = async (inviteId: string, action: string) => {
    const message = action === "ACCEPTED" ? "Accept" : "Decline";
    const areYouSure = confirm(`${message} team invitation?`);

    if (areYouSure) {
      updateState({ loading: { ...state.loading, teamInvitations: true } });
      try {
        await handleTeamInvitation(user.id, inviteId, action);
        navigate(0);
      } catch (error) {
        console.error("Error on handle invitation:", error);
      } finally {
        updateState({ loading: { ...state.loading, teamInvitations: false } });
      }
    }
  };

  const handleSubmitInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ loading: { ...state.loading, memberInvitations: true } });
    try {
      if (selectedTeam?.id && state.userEmail) {
        await sendInvitation(selectedTeam.id, state.userEmail);
        alert("User invited successfully!");
        fetchMemberInvitations();
      }
    } catch (error) {
      alert(`Error on create invitation: ${error}`);
    } finally {
      updateState({ loading: { ...state.loading, memberInvitations: false } });
    }
  };

  useEffect(() => {
    if (selectedTeam && user) {
      fetchMemberInvitations();
    }
    fetchTeamInvitations();
  }, [selectedTeam]);

  return (
    <div className="flex flex-col gap-4">
      <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2 space-y-9">
        {/* Invite members */}
        <div className="px-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold leading-4">
              Invite members to{" "}
              <span className="font-bold text-red-vibrant">
                {selectedTeam.name || ""}
              </span>
            </h2>
            <span className="text-sm">
              Invite your team members to collaborate.
            </span>
          </div>
          <form
            onSubmit={handleSubmitInvite}
            className="mb-6 flex items-center justify-start gap-4"
          >
            <div className="w-[300px]">
              <Input
                id="userEmail"
                name="userEmail"
                placeholder="User email"
                value={state.userEmail || ""}
                type="email"
                handleChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="h-9 w-[170px] bg-red-vibrant rounded-md text-nowrap text-xs md:text-sm text-center text-white font-semibold duration-100 hover:bg-red-hover"
            >
              {state.loading.memberInvitations ? (
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
                  {state.loading.memberInvitations ? (
                    <tr>
                      <td
                        className="h-20 text-center text-sm italic font-bold"
                        colSpan={3}
                      >
                        <div className="flex w-full items-center justify-center">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-vibrant border-t-transparent" />
                        </div>
                      </td>
                    </tr>
                  ) : state.memberInvitations.length > 0 ? (
                    state.memberInvitations.map((memberInvite, index) => {
                      return (
                        <tr
                          key={memberInvite.id}
                          className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                        >
                          <td
                            className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                          >
                            <span>{memberInvite.user.email}</span>
                          </td>
                          <td
                            className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                          >
                            {format(
                              parseISO(memberInvite.createdAt),
                              "MM/dd/yyyy"
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
                                    `Resend invite to ${memberInvite.user.email}?`
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
                                  handleCancelInvite(
                                    memberInvite.id,
                                    memberInvite.user.email
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
      <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2 space-y-9">
        {/* My team invitations */}
        <div className="px-6">
          <div className="mb-2">
            <h2 className="text-lg font-semibold leading-4">
              My team invitations{" "}
            </h2>
            <span className="text-sm">List of teams who invited me</span>
          </div>

          <div className="space-y-3">
            <div className="overflow-x-scroll md:overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
              <table className="w-full border-collapse rounded-md">
                <thead>
                  <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                    <th className="p-3 w-[60%]">Team</th>
                    <th className="p-3 w-[20%] text-nowrap">Invitation date</th>
                    <th className="p-3 w-[20%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.loading.teamInvitations ? (
                    <tr>
                      <td
                        className="h-20 text-center text-sm italic font-bold"
                        colSpan={3}
                      >
                        <div className="flex w-full items-center justify-center">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-vibrant border-t-transparent" />
                        </div>
                      </td>
                    </tr>
                  ) : state.teamInvitations.length > 0 ? (
                    state.teamInvitations.map((memberInvite, index) => {
                      return (
                        <tr
                          key={memberInvite.id}
                          className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                        >
                          <td
                            className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                          >
                            <span>{memberInvite.team.name}</span>
                          </td>
                          <td
                            className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                          >
                            {format(
                              parseISO(memberInvite.createdAt),
                              "MM/dd/yyyy"
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
                                  handleInvitationAction(
                                    memberInvite.id,
                                    "REJECTED"
                                  )
                                }
                                className="flex items-center justify-center gap-2 h-8 px-3 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary group"
                              >
                                <span className="font-semibold">Decline</span>
                                <X size={16} weight="bold" />
                              </button>
                              <button
                                title="Resend invitation"
                                type="button"
                                onClick={() =>
                                  handleInvitationAction(
                                    memberInvite.id,
                                    "ACCEPTED"
                                  )
                                }
                                className="flex items-center justify-center gap-2 h-8 px-3 rounded-md text-white bg-green-500 duration-200 hover:bg-green-700"
                              >
                                <span className="font-semibold">Accept</span>
                                <Check size={16} weight="bold" />
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
                        No team invitations were found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
