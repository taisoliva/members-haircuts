import { apiConfig } from "./api-config.js";

export const findOne = async ({ id }) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/clients/${id}`, {
      method: "GET",
    });

    return await response.json()

  } catch (error) {
    alert("Esse id não existe!");
    return
  }
};
