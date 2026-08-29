import { mockUsers } from "../data/mockData.js";

// In-memory data store array
let users = [...mockUsers];

export const userRepository = {
    async findByEmail(email) {
        if (!email) return null;
        return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
    },

    async findById(id) {
        if (!id) return null;
        return users.find((u) => u.id === id) || null;
    },

    async create(userData) {
        const newUser = {
            id: `usr-${Date.now()}`,
            registeredOn: new Date().toISOString().split("T")[0],
            role: "citizen",
            ...userData,
        };
        users.push(newUser);
        return newUser;
    },

    async list() {
        return users.map(({ password, ...safeUser }) => safeUser);
    },
};
