import axios from "axios";


const API_URL = "http://127.0.0.1:8000/reports";


export async function getReports(month) {

  const response = await axios.get(
    API_URL,
    {
      params: {
        month,
      },
    }
  );


  return response.data;

}
