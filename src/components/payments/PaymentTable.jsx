function PaymentTable({
  payments,
  deletePayment,
  editPayment,
}) {
  return (
    <section className="payments">
      <h2>Son Ödemeler</h2>

      <table>
        <thead>
          <tr>
            <th>Üye</th>
            <th>Daire</th>
            <th>Tutar</th>
            <th>Tarih</th>
            <th>İşlem</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.name}</td>
              <td>{payment.apartment}</td>
              <td>{payment.amount} ₺</td>
              <td>{payment.date}</td>
              <td>
                <button onClick={() => editPayment(payment)}>
                  Düzenle
                </button>

                <button onClick={() => deletePayment(payment.id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PaymentTable;
