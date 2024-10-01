import { getWorkoutExercises } from "@/app/actions/getWorkoutExercises";
import { H1 } from "@/app/components/H1";
import Link from "next/link";
import { LogExerciseModal } from "./components/LogExerciseModal";

export default async function LogWorkoutPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    return null;
  }

  const exercises = await getWorkoutExercises(params.id);

  return (
    <div className="main-bg min-h-screen w-screen p-4 text-sm text-white">
      <Link className="text-base" href={"/dashboard"}>
        Go Back
      </Link>
      <H1>Log Workout</H1>
      <LogExerciseModal exercises={exercises} />
    </div>
  );
}
