export default function Spinner({ fullPage = true }: { fullPage?: boolean }) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="w-10 h-10 border-[3px] border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16 w-full">
      <div className="w-8 h-8 border-[3px] border-navy-900 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
