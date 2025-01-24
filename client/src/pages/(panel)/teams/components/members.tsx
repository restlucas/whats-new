import { OptionsButton } from "@src/components/button/options";
import { CaretDown, Trash } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useMembers } from "@src/hooks/useMembers";
import { removeMember, updateMemberRole } from "@src/services/teamsServices";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    value: "OWNER",
    name: "Owner",
    description: "Admin-level access to all resources.",
  },
  { value: "EDITOR", name: "Editor", description: "Can create and edit news" },
  { value: "READER", name: "Reader", description: "Can view and comment." },
];

export function Members({ teamId }: any) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { members, getMembers } = useMembers();
  const [teamMembers, setTeamMembers] = useState<any>([]);

  const [loadingMemberId, setLoadingMemberId] = useState<string | null>(null);

  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [removingMember, setRemovingMember] = useState<string | null>(null);

  const handleMember = async (memberId: string, roleValue: string) => {
    setLoadingMemberId(memberId);

    let memberIndex = teamMembers.findIndex(
      (item: any) => item.user.id === memberId
    );

    const updatedMember = { ...teamMembers[memberIndex], role: roleValue };

    const updatedTeamMembers = [
      ...teamMembers.slice(0, memberIndex),
      updatedMember,
      ...teamMembers.slice(memberIndex + 1),
    ];

    setTeamMembers(updatedTeamMembers);
    const response = await updateMemberRole(
      teamId,
      updatedMember.user.id,
      updatedMember.role
    );

    if (response.status === 201) {
      alert("Função atualizada com sucesso!");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingMemberId(null);
  };

  const removeUser = async (memberId: string, memberName: string) => {
    setRemovingMember(memberId);
    setIsRemoving(true);
    const areYouSure = confirm(
      `Do you really want to remove ${memberName} from your team?`
    );

    if (areYouSure) {
      await removeMember(teamId, memberId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(0);
    }

    setRemovingMember(null);
    setIsRemoving(false);
  };

  useEffect(() => {
    if (members) setTeamMembers(members);
  }, [members]);

  useEffect(() => {
    if (teamId) getMembers(teamId);
  }, [teamId]);

  return (
    <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
      <div className="px-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold leading-4">Members</h2>
          <span className="text-sm ">Manage your members</span>
        </div>

        {/* Members */}
        <div className="relative w-full flex flex-col gap-8">
          {teamMembers.map((member: any, index: number) => {
            return (
              <div
                key={index}
                className="relative flex items-center justify-between"
              >
                <div className="flex items-start justify-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-tertiary/20 dark:bg-tertiary" />
                  <div className="flex flex-col items-start justify-start">
                    <h5 className="text-xs md:text-base font-semibold leading-4">
                      {member.user.name}
                    </h5>
                    <span className="text-xs md:text-sm">
                      {member.user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {member.user.id !== user.id && (
                    <button
                      onClick={() =>
                        removeUser(member.user.id, member.user.name)
                      }
                      className="h-9 w-9 rounded-md flex items-center justify-center duration-200 hover:bg-red-vibrant group"
                    >
                      {removingMember === member.user.id ? (
                        <div className="flex w-full items-center justify-center">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        </div>
                      ) : (
                        <Trash
                          size={22}
                          className="duration-200 group-hover:fill-white"
                        />
                      )}
                    </button>
                  )}
                  <OptionsButton
                    selectedValue={member.role}
                    icon={<CaretDown size={18} />}
                    memberId={member.user.id}
                    loading={loadingMemberId === member.user.id}
                    disabled={false}
                    handleRole={handleMember}
                    options={roles}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
