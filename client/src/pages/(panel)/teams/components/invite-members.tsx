import { Input } from "@components/input";
import { ArrowClockwise, CirclesFour, X } from "@phosphor-icons/react";

export function InviteMembers() {
  const handleChange = () => {};

  return (
    <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
      <div className="px-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold leading-4">Invite members</h2>
          <span className="text-sm">
            Invite your team members to collaborate.
          </span>
        </div>
        <div className="mb-6 flex items-center justify-start gap-4">
          <div className="w-[300px]">
            <Input
              id="memberEmail"
              name="memberEmail"
              placeholder="Member email"
              handleChange={handleChange}
            />
          </div>
          <button className="h-9 px-4 bg-vibrant-red rounded-md text-center text-white text-sm font-semibold duration-100 hover:bg-vibrant-red/50">
            Send invite link
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold mt-6">
            Invitations awaiting acceptance
          </h3>

          <div className=" overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
            <table className="w-full border-collapse rounded-md">
              <thead>
                <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                  <th className="p-3 w-[60%]">Email</th>
                  <th className="p-3 w-[20%]">Invitation date</th>
                  <th className="p-3 w-[20%]"></th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                    >
                      <td
                        className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                      >
                        <span>test@email.com</span>
                      </td>
                      <td
                        className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                      >
                        01/01/2025
                      </td>
                      <td
                        className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="Resend invitation"
                            type="button"
                            onClick={() =>
                              confirm("Resend invite to test@email.com?")
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
                              confirm("Revoke invite from test@email.com?")
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
