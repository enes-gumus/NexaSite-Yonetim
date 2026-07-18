import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

function MemberDetail() {


  const { id } = useParams();


  const [member, setMember] = useState(null);


  const [year, setYear] = useState("2026");




  const years = [

    "2026",
    "2027",
    "2028",
    "2029",
    "2030"

  ];





  async function loadMember() {

    try {
     
      const response = await api.get(

  `/members/${id}/detail`,

  {
    params: {
      year
    }
  }

);
  

      setMember(response.data);


    } catch (error) {

      console.error(

        "Üye detayı alınamadı:",

        error.response?.data || error.message

      );

    }

  }





  useEffect(() => {

    loadMember();

  }, [id, year]);





  if (!member) {

    return <h2>Yükleniyor...</h2>;

  }





  return (

    <>

      <h1>
        Üye Detayı
      </h1>





      <section className="card">


        <h3>
          {member.name}
        </h3>


        <p>
          Daire: {member.apartment}
        </p>


        <p>
          Telefon: {member.phone}
        </p>



        <hr />



        <p>
          Aidat Tutarı:

          <strong>
            {" "}{member.fee} ₺
          </strong>

        </p>




        <p>
          Toplam Ödeme:

          <strong>
            {" "}{member.total_paid} ₺
          </strong>

        </p>



      </section>






      <section className="card">


        <h2>
          Ödeme Durumu
        </h2>



        <select

          value={year}

          onChange={(e) =>
            setYear(e.target.value)
          }

        >


          {years.map((item) => (

            <option

              key={item}

              value={item}

            >

              {item}

            </option>

          ))}


        </select>





        <table>


          <thead>

            <tr>

              <th>Ay</th>

              <th>Durum</th>

            </tr>

          </thead>




          <tbody>


            {member.payment_status.map((item, index) => (


              <tr key={index}>


                <td>

                  {item.month} {item.year}

                </td>



                <td>


                  {item.paid ? (

                    <span>
                      ✅ Ödendi
                    </span>

                  ) : (

                    <span>
                      ❌ Bekliyor
                    </span>

                  )}



                </td>


              </tr>


            ))}


          </tbody>


        </table>


      </section>







      <section className="payments">


        <h2>
          Ödeme Geçmişi
        </h2>




        <table>


          <thead>

            <tr>

              <th>Ay</th>

              <th>Tutar</th>

            </tr>

          </thead>



          <tbody>


            {member.payments.length === 0 ? (


              <tr>

                <td colSpan="2">

                  Ödeme bulunamadı.

                </td>

              </tr>


            ) : (



              member.payments.map((payment) => (


                <tr key={payment.id}>


                  <td>

                    {payment.month}

                  </td>



                  <td>

                    {payment.amount} ₺

                  </td>


                </tr>


              ))


            )}


          </tbody>


        </table>


      </section>


    </>

  );

}


export default MemberDetail;
