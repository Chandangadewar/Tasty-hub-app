const isAdminAuthenticated = (req, res, next) => {
  if (req.session && req.session.adminId) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
  }
};

module.exports = { isAdminAuthenticated };