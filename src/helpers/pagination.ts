export const countSkip = (page: number, limit: number) => {
  return (page - 1) * limit;
};
