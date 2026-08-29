export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    });
};

export const globalErrorHandler = (err, req, res, next) => {
    console.error("API Server Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected internal server error occurred.";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
};
