const isAdmin = async (request, response, next) => {
  const role = request.headers.role;
  if (role != 'Admin')
    return response.status(403).json({ status: 403, message: 'Unauthorized' });
  next();
};
module.exports = { isAdmin };