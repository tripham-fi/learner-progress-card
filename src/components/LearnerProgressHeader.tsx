import { Link } from "react-router-dom";
import defaultAvatar from "@assets/default-profile.webp";

interface HeaderProp {
  image: string | undefined | null;
  name: string | undefined | null;
}

export default function LearnerProgressHeader({image, name}: HeaderProp) {
  return (
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
          <img
            className="w-12 h-12 object-cover rounded-full mx-4  shadow"
            src={image ?? defaultAvatar}
            alt="avatar"
          />
        </div>
        <h1 className="mt-3 text-xl font-bold text-text">
          {name || "User Name"}
        </h1>
      </div>
    </header>
  );
}
