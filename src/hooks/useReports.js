import { useEffect, useState } from "react";

import { getReports } from "../services/reportService";


export default function useReports() {


  const [month, setMonth] = useState("Ağustos");

  const [year, setYear] = useState("2026");


  const [report, setReport] = useState(null);



  async function loadReport() {

    try {

      const selectedMonth = `${month} ${year}`;


      console.log(
        "API'ye gönderilen:",
        selectedMonth
      );


      const data = await getReports(
        selectedMonth
      );


      console.log(
        "Gelen rapor:",
        data
      );


      setReport(data);


    } catch (error) {


      console.error(
        "Rapor alınamadı:",
        error.response?.data || error.message
      );


    }

  }





  useEffect(() => {

    loadReport();

  }, [month, year]);





  return {

    month,
    setMonth,

    year,
    setYear,

    report,

  };

}
