import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-rti-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
                replace
            />
        );
    }

    return children;
}
