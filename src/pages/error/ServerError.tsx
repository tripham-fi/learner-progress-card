import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text">500</h1>
        <p className="mt-2 text-xl text-muted">Oops! Something went wrong.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-card border border-track bg-surface px-4 py-2 text-text hover:border-accent"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
