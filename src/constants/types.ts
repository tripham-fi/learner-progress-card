export type Status = "not_started" | "in_progress" | "completed";

export type Learner = {
  name: string;
  username: string;
  image: string | null;
  program: string;
  enrolledAt: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  status: Status;
  lastActivity: string | null;
};
export type Result<T> = { data: T; status: number };

export type ErrorResult = {
  status: number;
  message: string;
};
