import { Navigate } from "react-router-dom";
import { auth } from "../utils/auth";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = auth.getUser();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}