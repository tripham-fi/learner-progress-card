import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { ApiError } from "../../api/server";

export default function ServerError() {
  const error = useRouteError();
  let statusCode = "Error";
  let errorMessage = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    errorMessage =
      error.data?.message ||
      error.statusText ||
      "Page not found or error occurred.";
  } else if (error instanceof ApiError) {
    statusCode = error.status.toString();
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text">{statusCode}</h1>
        <p className="mt-2 text-xl text-muted">{errorMessage}</p>
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
