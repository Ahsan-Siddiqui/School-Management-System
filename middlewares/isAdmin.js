// isAdmin.js

module.exports = (req, res, next) => {
    // Check if user is logged in and has the admin role
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        msg: 'Unauthorized',
      });
    }
    next();
  };
  