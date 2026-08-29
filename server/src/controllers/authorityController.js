import { authorityRepository } from "../repositories/authorityRepository.js";

export const authorityController = {
    /**
     * List all public authorities with optional category & keyword search
     * GET /api/authorities
     */
    async list(req, res, next) {
        try {
            const { query, category } = req.query;
            const list = await authorityRepository.findAll({ query, category });

            return res.status(200).json({
                success: true,
                data: {
                    authorities: list,
                    count: list.length,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get authority by ID
     * GET /api/authorities/:id
     */
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const authority = await authorityRepository.findById(id);

            if (!authority) {
                return res.status(404).json({
                    success: false,
                    message: `Public authority not found: ${id}`,
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    authority,
                },
            });
        } catch (error) {
            next(error);
        }
    },
};
