import { useParams, Link } from "react-router-dom";

export default function LearnerDetail() {
  const { username } = useParams();

  return (
    <div className="min-h-screen bg-bg text-text  ">
      <header className="w-full bg-surface border-track relative py-8 px-4">
        <div className="absolute left-6 top-6">
          <Link
            to="/"
            className="text-sm font-bold text-muted hover:text-text bg-track px-3 py-1.5 rounded-lg"
          >
            ← Back
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-track overflow-hidden shadow-inner flex items-center justify-center border-surface">
            <span className="text-2xl font-bold text-muted uppercase">
              {username ? username.charAt(0) : "U"}
            </span>
          </div>
          <h1 className="mt-3 text-xl font-bold text-text">
            {username || "User Name"}
          </h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-surface rounded-b-sm border border-track p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Contents</h2>
          <p className="text-muted">
            Module card....
          </p>
        </div>
      </main>
    </div>
  );
}
