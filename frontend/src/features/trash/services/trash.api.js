import apiClient from "../../../shared/api/apiClient";

export const getDeletedLinks = async () => {
  const res = await apiClient.get("/links/deleted");

  return res.data;
};

export const restoreLink = async (id) => {
  const res = await apiClient.patch(`/links/${id}/restore`);

  return res.data;
};

export const purgeLink = async (id) => {
  const res = await apiClient.delete(`/links/${id}/purge`);

  return res.data;
};