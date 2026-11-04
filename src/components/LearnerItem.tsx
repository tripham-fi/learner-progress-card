import { Link } from "react-router-dom";
import type { Learner } from "../constants/types";
import ProgressBar from "./ui/ProgressBar";
import StatusBadge from "./ui/StatusBadge";
import defaultAvatar from "@assets/default-profile.webp";

interface CardItemProp {
  learner: Learner;
}

export default function LearnerItem({
  learner: {
    program,
    programId,
    percent,
    name,
    username,
    image,
    lastActivity,
    status,
  },
}: CardItemProp) {
  return (
    <Link
      to={`/learner/${username}?programId=${programId}`}
      className="rounded-xl bg-surface p-4 border cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-text">{program}</h2>
        <StatusBadge status={status} />
      </div>
      <ProgressBar percent={percent} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            className="w-12 h-12 object-cover rounded-full mx-4  shadow"
            src={image ?? defaultAvatar}
            alt="avatar"
          />
          <span className="text-sm text-text">{name}</span>
        </div>
        <span className="text-sm text-muted">{lastActivity}</span>
      </div>
    </Link>
  );
}
