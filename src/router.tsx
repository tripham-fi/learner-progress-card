import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import LearnerDetail from "./pages/LearnerDetail";
import NotFound from "./pages/error/NotFound";
import ServerError from "./pages/error/ServerError";
import LearnerList from "./pages/LearnerList";
import { getLearners } from "./api/learner";

const publicRoutes = [
  {
    path: "/",
    element: <LearnerList />,
    loader: async () => {
      return await getLearners();
    },
  },
  { path: "/learner/:username", element: <LearnerDetail /> },
  { path: "*", element: <NotFound /> },
];

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: publicRoutes,
    errorElement: <ServerError />,
  },
]);
