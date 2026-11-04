import LearnerItem from "../components/LearnerItem";
import { useLoaderData } from "react-router-dom";
import { type Result, type Learner } from "../constants/types";
export default function LearnerList() {
  const result = useLoaderData<Result<Learner[]>>(); 
  const learners = result.data;
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {learners.length > 0 &&
        learners.map((learner) => (
          <LearnerItem learner={learner} key={learner.name} />
        ))}
    </div>
  );
}
