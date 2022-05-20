export const apolloError = (err) => {
  if (err.graphqlErrors?.length !== 0 || err.networkErrors?.length !== 0)
    return "500";
  if (err.clientErrors?.length !== 0) return "400";
  return "404";
};
