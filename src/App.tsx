import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
