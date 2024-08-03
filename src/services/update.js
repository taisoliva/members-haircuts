import { apiConfig } from "./api-config";

export const update = async ({ id, totalCuts, cutsRemaining, cutsNeeded }) => {
  try {
    await fetch(`${apiConfig.baseUrl}/clients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loyaltyCard: {
          totalCuts,
          cutsRemaining,
          cutsNeeded,
        },
      }),
    });

    //return alert("Dados atualizados com sucesso!");
  } catch (error) {
    console.log(error);

    return alert("Algo inesperado aconteceu!");
  }
};
