const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

/**
 * Helper to get the saved JWT token from storage
 */
const getAuthToken = () => {
    try {
        const savedUser = sessionStorage.getItem("rti_user") || localStorage.getItem("rti_user");
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            return parsed.token || null;
        }
    } catch (e) {
        return null;
    }
    return null;
};

/**
 * Base fetch wrapper with auth header and error parsing
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const error = new Error(data.message || `Request failed with status ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    } catch (error) {
        // Fallback for network issues / server offline
        console.warn(`[API Request Error] ${endpoint}:`, error.message);
        throw error;
    }
}

// ── Auth APIs ───────────────────────────────────────────────────
export const authApi = {
    login: (credentials) =>
        request("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        }),

    register: (userData) =>
        request("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        }),

    getProfile: () => request("/auth/me"),
};

// ── RTI Application APIs ────────────────────────────────────────
export const applicationApi = {
    create: (applicationData) =>
        request("/applications", {
            method: "POST",
            body: JSON.stringify(applicationData),
        }),

    list: () => request("/applications"),

    track: (registrationNumber) =>
        request(`/applications/${encodeURIComponent(registrationNumber)}`),

    getStats: () => request("/applications/stats/summary"),
};

// ── First Appeal APIs (Section 19(1) RTI Act 2005) ─────────────
export const appealApi = {
    create: (appealData) =>
        request("/appeals", {
            method: "POST",
            body: JSON.stringify(appealData),
        }),

    list: () => request("/appeals"),

    track: (appealNumber) =>
        request(`/appeals/${encodeURIComponent(appealNumber)}`),

    getByParent: (parentRegNo) =>
        request(`/appeals/parent/${encodeURIComponent(parentRegNo)}`),
};

// ── Public Authorities APIs ─────────────────────────────────────
export const authorityApi = {
    list: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.query) queryParams.append("query", params.query);
        if (params.category) queryParams.append("category", params.category);
        const queryStr = queryParams.toString();
        return request(`/authorities${queryStr ? `?${queryStr}` : ""}`);
    },

    getById: (id) => request(`/authorities/${encodeURIComponent(id)}`),
};

// ── Health Check API ────────────────────────────────────────────
export const healthApi = {
    check: () => request("/health"),
};

const api = {
    auth: authApi,
    applications: applicationApi,
    appeals: appealApi,
    authorities: authorityApi,
    health: healthApi,
};

export default api;
