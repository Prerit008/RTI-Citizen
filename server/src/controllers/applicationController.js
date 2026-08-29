import { applicationRepository } from "../repositories/applicationRepository.js";

export const applicationController = {
    /**
     * File a new RTI Application
     * POST /api/applications
     */
    async create(req, res, next) {
        try {
            const body = req.body;
            const userId = req.user?.id || body.userId || null;

            const application = await applicationRepository.create({
                ...body,
                userId,
            });

            return res.status(201).json({
                success: true,
                message: "RTI Application submitted successfully.",
                data: {
                    application,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * List applications (for current user if authenticated, or query)
     * GET /api/applications
     */
    async list(req, res, next) {
        try {
            let list = [];
            if (req.user?.id) {
                list = await applicationRepository.findByUserId(req.user.id);
            } else {
                list = await applicationRepository.findAll();
            }

            return res.status(200).json({
                success: true,
                data: {
                    applications: list,
                    count: list.length,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Track RTI application by registration number
     * GET /api/applications/:regNumber
     */
    async getByRegistrationNumber(req, res, next) {
        try {
            const { regNumber } = req.params;
            const application = await applicationRepository.findByRegistrationNumber(regNumber);

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: `No RTI application found with registration number: ${regNumber}`,
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    application,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get summary metrics for citizen dashboard
     * GET /api/applications/stats/summary
     */
    async getStats(req, res, next) {
        try {
            const userId = req.user?.id || null;
            const stats = await applicationRepository.getStats(userId);

            return res.status(200).json({
                success: true,
                data: {
                    stats,
                },
            });
        } catch (error) {
            next(error);
        }
    },
};
