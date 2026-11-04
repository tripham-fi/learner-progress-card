export type Status = "not_started" | "in_progress" | "completed";

export type Employee = {
  id: string;
  name: string;
  username: string;
  image: string | null;
};

export type ModuleLearning = {
  id: string;
  title: string;
  position: number;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  status: Status;
};

export type Learner = {
  name: string;
  username: string;
  image: string | null;
  program: string;
  programId: string;
  enrolledAt: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  status: Status;
  lastActivity: string | null;
};

export type LearnerProgress = {
  learner: Employee;
  program: string;
  programId: string;
  enrolledAt: string;
  status: Status;
  totalCompleted: number;
  totalLessons: number;
  percent: number;
  modulesTotal: number;
  modulesCompleted: number;
  lastActivity: string | null;
  modules: ModuleLearning[];
};

export type Result<T> = { data: T; status: number };

export type ErrorResult = {
  status: number;
  message: string;
};
