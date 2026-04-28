function notFound(req, res) {
  res.status(404).json({ message: "Not found" });
}

function errorHandler(err, req, res, next) {
  const status = Number(err.statusCode ?? 500);
  const message = err.message ?? "Server error";

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };

