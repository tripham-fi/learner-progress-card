import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import CardList from "./pages/LearnerList";
import LearnerDetail from "./pages/LearnerDetail";
import ErrorPage from "./pages/NotFound";

const publicRoutes = [
  { path: "/", element: <CardList /> },
  { path: "/learner/:username", element: <LearnerDetail /> },
  { element: <ErrorPage /> },
];

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: publicRoutes,
    errorElement: <ErrorPage />,
  },
]);
