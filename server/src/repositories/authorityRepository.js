import { mockAuthorities } from "../data/mockData.js";

let authorities = [...mockAuthorities];

export const authorityRepository = {
    async findAll({ query = "", category = "" } = {}) {
        let results = [...authorities];

        if (category && category !== "All") {
            results = results.filter(
                (a) => a.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (query) {
            const q = query.toLowerCase().trim();
            results = results.filter((a) => {
                const nameMatch = a.name.toLowerCase().includes(q);
                const descMatch = a.description.toLowerCase().includes(q);
                const keywordMatch = a.keywords?.some((k) => k.toLowerCase().includes(q));
                return nameMatch || descMatch || keywordMatch;
            });
        }

        return results;
    },

    async findById(id) {
        if (!id) return null;
        return authorities.find((a) => a.id.toLowerCase() === id.toLowerCase()) || null;
    },
};
