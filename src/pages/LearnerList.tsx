import LearnerItem from "../components/LearnerItem";
import { useEffect, useState } from "react";
import { getLearners } from "../api/learner";
import type { Learner } from "../constants/types";
import { ApiError } from "../api/server";
import ServerError from "./error/ServerError";

export default function LearnerList() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getLearners()
      .then((res) => {
        setLearners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-muted">Loading...</p>;

  if (error) {
    return (
      <ServerError
        status={error instanceof ApiError ? error.status : 500}
        message={error.message}
      />
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {learners.length > 0 &&
        learners.map((learner) => (
          <LearnerItem learner={learner} key={learner.name} />
        ))}
    </div>
  );
}
