const requireAuth = (req, res, next) => {
    // Check if user is authenticated (e.g., by verifying session)
    if (req.session && req.session.username) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, return an error response
        res.status(401).json({ error: 'Authentication required' });
    }
};

module.exports = requireAuth;