import api from "./api";



export async function getSettings() {


  const response = await api.get(
    "/settings"
  );


  return response.data;

}






export async function updateSettings(fee) {


  const response = await api.put(

    "/settings",

    null,

    {
      params: {
        fee,
      },
    }

  );


  return response.data;

}
