import dataProvider from "@refinedev/simple-rest";

export const mocksProvider = dataProvider(
  process.env.REACT_APP_BASE_URL as string
);
