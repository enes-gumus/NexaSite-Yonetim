import DashboardCards from "../components/dashboard/DashboardCards";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentTable from "../components/payments/PaymentTable";
import SearchBar from "../components/SearchBar";

import usePayments from "../hooks/usePayments";

function Dashboard() {
  const {
    fee,
    setFee,

    memberName,
    setMemberName,

    apartment,
    setApartment,

    amount,
    setAmount,

    search,
    setSearch,

    payments,

    totalMembers,
    paidMembers,
    waitingMembers,
    totalCollected,

    addPayment,
    deletePayment,
    editPayment,

    isEditing,
  } = usePayments();

  return (
    <>
      <DashboardCards
        totalMembers={totalMembers}
        paidMembers={paidMembers}
        waitingMembers={waitingMembers}
        fee={fee}
        totalCollected={totalCollected}
      />

      <PaymentForm
        fee={fee}
        setFee={setFee}
        memberName={memberName}
        setMemberName={setMemberName}
        apartment={apartment}
        setApartment={setApartment}
        amount={amount}
        setAmount={setAmount}
        addPayment={addPayment}
        isEditing={isEditing}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <PaymentTable
        payments={payments}
        deletePayment={deletePayment}
        editPayment={editPayment}
      />
    </>
  );
}

export default Dashboard;
