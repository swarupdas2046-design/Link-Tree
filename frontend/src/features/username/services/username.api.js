import apiClient from "../../../shared/api/apiClient";

export const claimUsername = async (username) => {
  const res = await apiClient.patch(
    "/auth/claim-username",

    {
      username,
    },
  );

  return res.data;
};
