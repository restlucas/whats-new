export function SubmitButton({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      className="h-9 w-[170px] bg-red-vibrant rounded-md text-nowrap text-xs md:text-sm text-center text-white font-semibold duration-100 hover:bg-red-hover"
    >
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
