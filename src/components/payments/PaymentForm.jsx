function PaymentForm({

  fee,

  members,

  memberId,
  setMemberId,

  amount,
  setAmount,

  month,
  setMonth,

  addPayment,

  isEditing,

}) {



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
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
  ];





  function handleMonthChange(e) {

    const selectedMonth = e.target.value;


    const selectedYear =
      month.split(" ")[1] || "2026";



    setMonth(
      `${selectedMonth} ${selectedYear}`
    );

  }





  function handleYearChange(e) {

    const selectedYear = e.target.value;


    const selectedMonth =
      month.split(" ")[0] || "Ocak";



    setMonth(
      `${selectedMonth} ${selectedYear}`
    );

  }





  return (

    <>


      <section className="form">


        <label>
          Aidat Tutarı: {fee} ₺
        </label>




        <select

          value={memberId}

          onChange={(e) =>
            setMemberId(e.target.value)
          }

        >

          <option value="">
            Üye Seçiniz
          </option>



          {members.map((member) => (

            <option

              key={member.id}

              value={member.id}

            >

              {member.name} - {member.apartment}

            </option>

          ))}


        </select>





        <input

          type="number"

          placeholder="Ödenen Tutar"

          value={amount}

          onChange={(e) =>
            setAmount(e.target.value)
          }

        />





        <select

          value={
            month.split(" ")[0] || ""
          }

          onChange={handleMonthChange}

        >

          <option value="">
            Ay Seçiniz
          </option>



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

          value={
            month.split(" ")[1] || ""
          }

          onChange={handleYearChange}

        >

          <option value="">
            Yıl Seçiniz
          </option>



          {years.map((year) => (

            <option

              key={year}

              value={year}

            >

              {year}

            </option>

          ))}


        </select>


      </section>





      <section className="buttons">


        <button onClick={addPayment}>

          {isEditing
            ? "Kaydet"
            : "Ödeme Ekle"
          }


        </button>


      </section>


    </>

  );

}


export default PaymentForm;
