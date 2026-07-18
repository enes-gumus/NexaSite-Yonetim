import useSettings from "../hooks/useSettings";


function Settings() {


  const {
    fee,
    setFee,
    saveSettings,
    message,
  } = useSettings();





  return (

    <>

      <h1>Ayarlar</h1>



      <section className="form">


        <label>
          Aylık Aidat Tutarı
        </label>


        <input

          type="number"

          value={fee}

          onChange={(e) =>
            setFee(Number(e.target.value))
          }

        />



        <button onClick={saveSettings}>

          Kaydet

        </button>



        {message && (

          <p>
            {message}
          </p>

        )}


      </section>


    </>

  );

}


export default Settings;
