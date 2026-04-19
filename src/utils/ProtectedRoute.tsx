import { Navigate } from "react-router-dom";
import { auth } from "../utils/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = auth.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}