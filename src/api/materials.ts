import api from ".";

export const getMaterials = async (params: object) => {
  return await api.get("/reports/reports/materials?sort=name", { params });
};
