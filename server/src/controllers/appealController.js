import { appealRepository } from "../repositories/appealRepository.js";

export const appealController = {
    /**
     * File a new First Appeal against a parent RTI Application
     * POST /api/appeals
     */
    async create(req, res, next) {
        try {
            const body = req.body;
            const userId = req.user?.id || body.userId || null;

            const appeal = await appealRepository.create({
                ...body,
                userId,
            });

            return res.status(201).json({
                success: true,
                message: "First Appeal filed successfully under Section 19(1) of RTI Act 2005.",
                data: {
                    appeal,
                },
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to file First Appeal.",
            });
        }
    },

    /**
     * Track a First Appeal by Appeal Registration Number
     * GET /api/appeals/:appealNumber
     */
    async getByAppealNumber(req, res, next) {
        try {
            const { appealNumber } = req.params;
            const appeal = await appealRepository.findByAppealNumber(appealNumber);

            if (!appeal) {
                return res.status(404).json({
                    success: false,
                    message: `No First Appeal found with number: ${appealNumber}`,
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    appeal,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get all appeals linked to a parent RTI application
     * GET /api/appeals/parent/:regNumber
     */
    async getByParentRegistration(req, res, next) {
        try {
            const { regNumber } = req.params;
            const list = await appealRepository.findByParentRegistrationNumber(regNumber);

            return res.status(200).json({
                success: true,
                data: {
                    appeals: list,
                    count: list.length,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * List appeals for current user
     * GET /api/appeals
     */
    async list(req, res, next) {
        try {
            const userId = req.user?.id || null;
            const list = await appealRepository.list(userId);

            return res.status(200).json({
                success: true,
                data: {
                    appeals: list,
                    count: list.length,
                },
            });
        } catch (error) {
            next(error);
        }
    },
};
