import Card from "./Card";

function DashboardCards({
  totalMembers,
  paidMembers,
  waitingMembers,
  fee,
  totalCollected,
}) {
  return (
    <section className="cards">
      <Card title="Toplam Üye" value={totalMembers} />
      <Card title="Ödeme Yapan" value={paidMembers} />
      <Card title="Ödeme Bekleyen" value={waitingMembers} />
      <Card title="Aidat Tutarı" value={`${fee} ₺`} />
      <Card title="Toplam Tahsilat" value={`${totalCollected} ₺`} />
    </section>
  );
}

export default DashboardCards;
