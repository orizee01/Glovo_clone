export const exampleMiddleware = (req, res, next) => {
    // Example middleware function
    console.log('Request received:', req.method, req.url);
    next();
};

// Export other middleware functions as needed
export const anotherMiddleware = (req, res, next) => {
    // Another example middleware function
    // Perform some operation
    next();
};