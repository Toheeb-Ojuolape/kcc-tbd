export const handleError = (error, res) => {
  res.status(400).json({
    message: error.message,
  });
};
