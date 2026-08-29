import { createContext, useContext, useState } from "react";

// ---------------------------------------------------------------
// Mock user database – in a real app this would be server-side
// ---------------------------------------------------------------
const MOCK_USERS = [
    {
        id: "usr-001",
        name: "Rahul Sharma",
        email: "rahul@citizen.in",
        mobile: "9876543210",
        password: "Citizen@123",
        registeredOn: "2024-03-15",
    },
    {
        id: "usr-002",
        name: "Priya Patel",
        email: "priya@citizen.in",
        mobile: "9123456780",
        password: "India@456",
        registeredOn: "2024-05-22",
    },
];

// Persist registered users across page reloads (session only)
let runtimeUsers = [...MOCK_USERS];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = sessionStorage.getItem("rti_user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // ── login ──────────────────────────────────────────────────
    const login = (email, password) => {
        const found = runtimeUsers.find(
            (u) =>
                u.email.toLowerCase() === email.trim().toLowerCase() &&
                u.password === password.trim()
        );
        if (!found) {
            return { success: false, message: "Invalid email or password." };
        }
        const { password: _pwd, ...safeUser } = found; // never expose password
        setUser(safeUser);
        sessionStorage.setItem("rti_user", JSON.stringify(safeUser));
        return { success: true };
    };

    // ── register ───────────────────────────────────────────────
    const register = (formData) => {
        const exists = runtimeUsers.some(
            (u) => u.email.toLowerCase() === formData.email.toLowerCase()
        );
        if (exists) {
            return {
                success: false,
                message: "An account with this email already exists.",
            };
        }
        const newUser = {
            id: `usr-${Date.now()}`,
            registeredOn: new Date().toISOString().split("T")[0],
            ...formData,
        };
        runtimeUsers.push(newUser);
        const { password: _pwd, ...safeUser } = newUser;
        setUser(safeUser);
        sessionStorage.setItem("rti_user", JSON.stringify(safeUser));
        return { success: true };
    };

    // ── logout ─────────────────────────────────────────────────
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("rti_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
