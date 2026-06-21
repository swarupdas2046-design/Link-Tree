import apiClient from "../../../shared/api/apiClient";

export const getUserLinks = async (username) => {
  const response = await apiClient.get(`/links/${username}`);
  return response.data;
};

export const recordClick = async (id) => {
  const response = await apiClient.post(`/links/${id}/click`);
  return response.data;
};