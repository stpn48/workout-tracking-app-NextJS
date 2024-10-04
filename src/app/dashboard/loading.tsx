import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <LoadingSpinner />
      <div className="absolute right-4 top-4 h-[28px] w-[116px] animate-pulse rounded-sm bg-stone-700" />
      <div className="absolute bottom-4 right-4 h-[28px] w-[71px] animate-pulse rounded-sm bg-stone-700" />
    </div>
  );
}
