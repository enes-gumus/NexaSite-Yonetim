import api from "./api";



export async function getPaymentStatus(month) {


  const response = await api.get(

    "/payment-status",

    {
      params: {
        month,
      },
    }

  );


  return response.data;

}
