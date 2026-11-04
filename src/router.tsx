import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import LearnerDetail from "./pages/LearnerDetail";
import NotFound from "./pages/error/NotFound";
import LearnerList from "./pages/LearnerList";

const publicRoutes = [
  {
    path: "/",
    element: <LearnerList />
  },
  { path: "/learner/:username", element: <LearnerDetail /> },
  { path: "*", element: <NotFound /> },
];

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: publicRoutes,
  },
]);
