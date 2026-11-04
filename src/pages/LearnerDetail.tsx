import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getLearnerProgress } from "../api/learner";
import type { LearnerProgress } from "../constants/types";
import ServerError from "./error/ServerError";
import { ApiError } from "../api/server";
import LearnerProgressHeader from "../components/LearnerProgressHeader";
import ModuleItem from "../components/ModuleItem";
import LearnerSummary from "../components/LearnerSummary";

export default function LearnerDetail() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("programId");
  const [loading, setLoading] = useState(true);
  const [learnerProgress, setLearnerProgress] = useState<LearnerProgress>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getLearnerProgress(username, programId)
      .then((res) => {
        setLearnerProgress(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [programId, username]);

  if (loading) {
    return <p className="text-center mt-20 text-muted">Loading...</p>;
  }

  if (error || !learnerProgress) {
    return (
      <ServerError
        status={error instanceof ApiError ? error.status : 500}
        message={error?.message ?? "Something went wrong."}
      />
    );
  }

  return (
    <>
      <LearnerProgressHeader
        image={learnerProgress?.learner.image}
        name={learnerProgress?.learner.name}
      />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <LearnerSummary learner={learnerProgress} />

        <div className="bg-surface rounded-card border border-track p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Modules</h2>
          {learnerProgress.modules.length === 0 ? (
            <p className="text-muted">No modules in this program.</p>
          ) : (
            <ul className="space-y-4">
              {learnerProgress.modules.map((m) => (
                <ModuleItem moduleLearning={m} key={m.id} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
