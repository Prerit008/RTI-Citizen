import { verifyToken } from "../utils/token.js";
import { userRepository } from "../repositories/userRepository.js";

/**
 * Mandatory authentication middleware
 */
export const protect = async (req, res, next) => {
    try {
        let token = null;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required. Please log in.",
            });
        }

        const decoded = verifyToken(token);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired session token. Please log in again.",
            });
        }

        const user = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User associated with this token no longer exists.",
            });
        }

        const { password, ...safeUser } = user;
        req.user = safeUser;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Optional authentication middleware: attaches user if token is valid, continues if not
 */
export const optionalAuth = async (req, res, next) => {
    try {
        let token = null;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (token) {
            const decoded = verifyToken(token);
            if (decoded && decoded.id) {
                const user = await userRepository.findById(decoded.id);
                if (user) {
                    const { password, ...safeUser } = user;
                    req.user = safeUser;
                }
            }
        }
        next();
    } catch (error) {
        next();
    }
};
