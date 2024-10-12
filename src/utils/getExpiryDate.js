export const getExpiryDate = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 5);
  const expirationDate = currentDate.toISOString();
  return expirationDate;
};
