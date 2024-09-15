export const handleSuccess = (message, res) => {
  res.status(200).json({
    message: message,
  });
};
