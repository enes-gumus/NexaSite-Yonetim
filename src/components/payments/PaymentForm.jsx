function PaymentForm({
  fee,
  setFee,
  memberName,
  setMemberName,
  apartment,
  setApartment,
  amount,
  setAmount,
  addPayment,
  isEditing,
}) {
  return (
    <>
      <section className="form">
        <input
          type="number"
          placeholder="Aidat Tutarı"
          value={fee}
          onChange={(e) => setFee(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Üye Adı"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Daire"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Ödenen Tutar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </section>

      <section className="buttons">
        <button onClick={addPayment}>
          {isEditing ? "Kaydet" : "Ödeme Ekle"}
        </button>
      </section>
    </>
  );
}

export default PaymentForm;
