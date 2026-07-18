import usePaymentStatus from "../hooks/usePaymentStatus";


function PaymentStatus() {


  const {
    month,
    setMonth,

    year,
    setYear,

    status,

  } = usePaymentStatus();



  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];


  const years = [
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];



  return (

    <>

      <h1>Ödeme Durumu</h1>



      <section className="form">


        <select

          value={month}

          onChange={(e) =>
            setMonth(e.target.value)
          }

        >

          {months.map((item) => (

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))}


        </select>





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



      </section>





      <section className="payments">


        <table>


          <thead>

            <tr>

              <th>Üye</th>

              <th>Daire</th>

              <th>Durum</th>

              <th>Tutar</th>

            </tr>

          </thead>




          <tbody>


            {status.map((item) => (


              <tr key={item.member_id}>


                <td>
                  {item.name}
                </td>


                <td>
                  {item.apartment}
                </td>


                <td>

                  {item.paid
                    ? "✅ Ödendi"
                    : "❌ Bekliyor"
                  }

                </td>


                <td>

                  {item.amount} ₺

                </td>


              </tr>


            ))}


          </tbody>



        </table>


      </section>


    </>

  );

}


export default PaymentStatus;
