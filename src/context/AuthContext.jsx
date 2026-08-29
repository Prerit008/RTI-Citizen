import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = sessionStorage.getItem("rti_user") || localStorage.getItem("rti_user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // Verify existing token on initial mount
    useEffect(() => {
        const verifySession = async () => {
            if (user?.token) {
                try {
                    const res = await authApi.getProfile();
                    if (res?.data?.user) {
                        const updatedUser = { ...res.data.user, token: user.token };
                        setUser(updatedUser);
                        sessionStorage.setItem("rti_user", JSON.stringify(updatedUser));
                    }
                } catch (err) {
                    console.warn("Session verification warning:", err.message);
                }
            }
            setLoading(false);
        };
        verifySession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── login ──────────────────────────────────────────────────
    const login = async (email, password) => {
        try {
            const res = await authApi.login({
                email: email.trim(),
                password: password.trim(),
            });

            if (res?.success && res.data?.user) {
                const sessionUser = {
                    ...res.data.user,
                    token: res.data.token,
                };
                setUser(sessionUser);
                sessionStorage.setItem("rti_user", JSON.stringify(sessionUser));
                localStorage.setItem("rti_user", JSON.stringify(sessionUser));
                return { success: true };
            }
            return {
                success: false,
                message: res?.message || "Invalid email or password.",
            };
        } catch (error) {
            return {
                success: false,
                message: error.data?.message || error.message || "Unable to connect to authentication server.",
            };
        }
    };

    // ── register ───────────────────────────────────────────────
    const register = async (formData) => {
        try {
            const res = await authApi.register(formData);

            if (res?.success && res.data?.user) {
                const sessionUser = {
                    ...res.data.user,
                    token: res.data.token,
                };
                setUser(sessionUser);
                sessionStorage.setItem("rti_user", JSON.stringify(sessionUser));
                localStorage.setItem("rti_user", JSON.stringify(sessionUser));
                return { success: true };
            }
            return {
                success: false,
                message: res?.message || "Registration failed.",
            };
        } catch (error) {
            return {
                success: false,
                message: error.data?.message || error.message || "Unable to connect to authentication server.",
            };
        }
    };

    // ── updateProfile ──────────────────────────────────────────
    const updateProfile = async (profileData) => {
        try {
            const res = await authApi.updateProfile(profileData);
            if (res?.success && res.data?.user) {
                const updated = {
                    ...user,
                    ...res.data.user,
                    token: user?.token,
                };
                setUser(updated);
                sessionStorage.setItem("rti_user", JSON.stringify(updated));
                localStorage.setItem("rti_user", JSON.stringify(updated));
                return { success: true, user: updated };
            }
            // If offline/mock fallback
            const fallbackUser = {
                ...user,
                ...profileData,
            };
            setUser(fallbackUser);
            sessionStorage.setItem("rti_user", JSON.stringify(fallbackUser));
            localStorage.setItem("rti_user", JSON.stringify(fallbackUser));
            return { success: true, user: fallbackUser };
        } catch (err) {
            console.warn("Update profile API error, saving locally:", err.message);
            const fallbackUser = {
                ...user,
                ...profileData,
            };
            setUser(fallbackUser);
            sessionStorage.setItem("rti_user", JSON.stringify(fallbackUser));
            localStorage.setItem("rti_user", JSON.stringify(fallbackUser));
            return { success: true, user: fallbackUser };
        }
    };

    // ── logout ─────────────────────────────────────────────────
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("rti_user");
        localStorage.removeItem("rti_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
