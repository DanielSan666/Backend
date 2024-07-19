export const adminRequired = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // El usuario es administrador, proceder
    } else {
      return res.status(403).json({ message: "Acceso denegado. Requiere permisos de administrador." });
    }
  };
  