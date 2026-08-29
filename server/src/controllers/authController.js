import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { generateToken } from "../utils/token.js";

export const authController = {
    /**
     * Register a new citizen account
     * POST /api/auth/register
     */
    async register(req, res, next) {
        try {
            const { name, email, mobile, password, address, city, state, pincode } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password are required.",
                });
            }

            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "An account with this email address already exists.",
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password.trim(), salt);

            const newUser = await userRepository.create({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                mobile: mobile ? mobile.trim() : "",
                password: hashedPassword,
                address: address || "",
                city: city || "",
                state: state || "",
                pincode: pincode || "",
            });

            const token = generateToken({ id: newUser.id, email: newUser.email });
            const { password: _pwd, ...safeUser } = newUser;

            return res.status(201).json({
                success: true,
                message: "Account registered successfully.",
                data: {
                    user: safeUser,
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Log in with email and password
     * POST /api/auth/login
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide email and password.",
                });
            }

            const user = await userRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            const isMatch = await bcrypt.compare(password.trim(), user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            const token = generateToken({ id: user.id, email: user.email });
            const { password: _pwd, ...safeUser } = user;

            return res.status(200).json({
                success: true,
                message: "Login successful.",
                data: {
                    user: safeUser,
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get authenticated citizen profile
     * GET /api/auth/me
     */
    async getProfile(req, res, next) {
        try {
            return res.status(200).json({
                success: true,
                data: {
                    user: req.user,
                },
            });
        } catch (error) {
            next(error);
        }
    },
};
