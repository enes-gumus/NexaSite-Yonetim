import { useEffect, useState } from "react";

import { getPaymentStatus } from "../services/statusService";


export default function usePaymentStatus() {


  const [month, setMonth] = useState("Ağustos");

  const [year, setYear] = useState("2026");


  const [status, setStatus] = useState([]);



  async function loadStatus() {

    try {

      const data = await getPaymentStatus(
        `${month} ${year}`
      );

      setStatus(data);


    } catch (error) {

      console.error(
        "Ödeme durumu alınamadı:",
        error.response?.data || error.message
      );

    }

  }




  useEffect(() => {

    loadStatus();

  }, [month, year]);





  return {

    month,
    setMonth,

    year,
    setYear,

    status,

  };


}

