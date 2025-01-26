export function AuthButton({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      className="w-full h-11 rounded-md bg-red-vibrant text-white font-bold duration-200 hover:bg-red-hover shadow-lg"
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
