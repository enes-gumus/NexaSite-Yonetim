import PaymentForm from "../components/payments/PaymentForm";
import PaymentTable from "../components/payments/PaymentTable";

import usePayments from "../hooks/usePayments";


function Payments() {


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


    addPayment,

    deletePayment,

    editPayment,


    isEditing,


  } = usePayments();





  return (

    <>

      <h1>
        Aidat İşlemleri
      </h1>




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





      <PaymentTable

        payments={payments}

        deletePayment={deletePayment}

        editPayment={editPayment}

      />


    </>

  );

}


export default Payments;
