import { Outlet } from "react-router-dom";
import ThemeToggle from "./ui/ThemeToggle";

export default function PublicRoute() {
  return (
    <>
      <header className="flex items-center justify-between gap-4 p-4">
        <h1 className="text-2xl font-bold">Learner Progress Cards</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto mt-24 flex-1">
        <Outlet />
      </main>
    </>
  );
}
