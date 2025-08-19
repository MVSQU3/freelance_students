export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Erreur capturée:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Une erreur est survenue";

  // Gestion spéciale Sequelize (DB)
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Clé étrangère invalide ou donnée liée inexistante.";
  }

  // Gestion spéciale JWT
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token invalide ou expiré.";
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};
