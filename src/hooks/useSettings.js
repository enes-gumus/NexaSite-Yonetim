import { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";



export default function useSettings() {


  const [fee, setFee] = useState(500);


  const [message, setMessage] = useState("");



  async function loadSettings() {

    try {

      const data = await getSettings();

      setFee(Number(data.fee));

      console.log("SETTINGS DATA:", data);


    } catch (error) {

      console.error(
        "Ayarlar alınamadı:",
        error.response?.data || error.message
      );

    }

  }





  async function saveSettings() {

    try {

      const data = await updateSettings(
        fee
      );


      setFee(Number(data.fee));


      setMessage(
        "Ayarlar kaydedildi."
      );


    } catch (error) {

      console.error(
        "Ayar kaydedilemedi:",
        error.response?.data || error.message
      );

    }

  }





  useEffect(() => {

    loadSettings();

  }, []);





  return {

    fee,
    setFee,

    saveSettings,

    message,

  };


}
