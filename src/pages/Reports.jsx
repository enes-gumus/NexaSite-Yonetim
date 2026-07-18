import { useEffect, useState } from "react";

import axios from "axios";



function Reports() {


  const [month, setMonth] = useState(
    "Ağustos 2026"
  );


  const [report, setReport] = useState(null);




  const months = [

    "Ocak 2026",
    "Şubat 2026",
    "Mart 2026",
    "Nisan 2026",
    "Mayıs 2026",
    "Haziran 2026",
    "Temmuz 2026",
    "Ağustos 2026",
    "Eylül 2026",
    "Ekim 2026",
    "Kasım 2026",
    "Aralık 2026"

  ];





  async function loadReport() {


    try {


      const response = await axios.get(

        "http://127.0.0.1:8000/reports",

        {
          params:{
            month
          },

          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }

        }

      );


      setReport(
        response.data
      );


    } catch(error){


      console.error(
        "Rapor alınamadı",
        error.response?.data || error.message
      );


    }


  }





  useEffect(()=>{


    loadReport();


  },[month]);






  return (

    <>


      <h1>
        Raporlar
      </h1>




      <section className="form">


        <select

          value={month}

          onChange={(e)=>
            setMonth(e.target.value)
          }

        >


          {months.map(item=>(


            <option

              key={item}

              value={item}

            >

              {item}

            </option>


          ))}


        </select>


      </section>





      {
        report && (


          <>



          <section className="cards">


            <div className="card">

              <h3>
                Toplam Üye
              </h3>

              <p>
                {report.total_members}
              </p>

            </div>




            <div className="card">

              <h3>
                Ödeme Yapan
              </h3>

              <p>
                {report.paid_members}
              </p>

            </div>




            <div className="card">

              <h3>
                Bekleyen
              </h3>

              <p>
                {report.waiting_members}
              </p>

            </div>




            <div className="card">

              <h3>
                Tahsilat
              </h3>

              <p>
                {report.total_collected} ₺
              </p>

            </div>




            <div className="card">

              <h3>
                Borç
              </h3>

              <p>
                {report.total_debt} ₺
              </p>

            </div>




            <div className="card">

              <h3>
                Tahsilat Oranı
              </h3>

              <p>
                %{report.collection_rate}
              </p>

            </div>


          </section>








          <section className="payments">


            <h2>
              Borçlu Üyeler
            </h2>



            <table>


              <thead>

                <tr>

                  <th>
                    Üye
                  </th>

                  <th>
                    Daire
                  </th>

                </tr>

              </thead>



              <tbody>


              {
                report.debtors.length === 0 ? (


                  <tr>

                    <td colSpan="2">

                      Borçlu üye yok

                    </td>

                  </tr>


                ) : (


                  report.debtors.map(
                    (member,index)=>(


                      <tr key={index}>


                        <td>
                          {member.name}
                        </td>


                        <td>
                          {member.apartment}
                        </td>


                      </tr>


                    )
                  )


                )

              }


              </tbody>


            </table>


          </section>


          </>


        )
      }


    </>

  );

}


export default Reports;
