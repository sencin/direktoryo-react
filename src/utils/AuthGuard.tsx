import { Navigate } from "react-router-dom";
import { auth } from "../utils/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = auth.getToken();

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}