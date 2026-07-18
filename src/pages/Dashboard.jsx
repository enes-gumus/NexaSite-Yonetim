import DashboardCards from "../components/dashboard/DashboardCards";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentTable from "../components/payments/PaymentTable";
import SearchBar from "../components/SearchBar";

import usePayments from "../hooks/usePayments";


function Dashboard() {


  const {

    payments,

    members,


    fee,


    memberId,
    setMemberId,


    amount,
    setAmount,


    month,
    setMonth,


    search,
    setSearch,


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


        members={members}


        memberId={memberId}

        setMemberId={setMemberId}



        amount={amount}

        setAmount={setAmount}



        month={month}

        setMonth={setMonth}



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
