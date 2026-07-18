import { useEffect, useState } from "react";


import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/paymentService";


import {
  getMembers
} from "../services/memberService";


import {
  getDashboardStats
} from "../services/dashboardService";


import {
  getSettings
} from "../services/settingsService";





export default function usePayments(){



  const [payments,setPayments] = useState([]);

  const [members,setMembers] = useState([]);



  const [fee,setFee] = useState(0);



  const [memberId,setMemberId] = useState("");

  const [amount,setAmount] = useState("");

  const [month,setMonth] = useState("");



  const [isEditing,setIsEditing] = useState(false);

  const [editingId,setEditingId] = useState(null);



  const [error,setError] = useState("");



  const [totalMembers,setTotalMembers] = useState(0);

  const [paidMembers,setPaidMembers] = useState(0);

  const [waitingMembers,setWaitingMembers] = useState(0);

  const [totalCollected,setTotalCollected] = useState(0);








  async function loadPayments(){

    const data = await getPayments();

    setPayments(data);

  }







  async function loadMembers(){

    const data = await getMembers();

    setMembers(data);

  }







  async function loadDashboard(){

    const data = await getDashboardStats();


    setTotalMembers(data.total_members);

    setPaidMembers(data.paid_members);

    setWaitingMembers(data.waiting_members);

    setTotalCollected(data.total_collected);

  }







  async function loadSettings(){

    const data = await getSettings();

    setFee(Number(data.fee));

  }







  useEffect(()=>{


    loadPayments();

    loadMembers();

    loadDashboard();

    loadSettings();


  },[]);









  async function addPayment(){



    setError("");



    if(
      !memberId ||
      !amount ||
      !month
    ){

      setError(
        "Lütfen tüm alanları doldurun."
      );

      return;

    }






    const payment = {

      member_id:Number(memberId),

      amount:Number(amount),

      month

    };







    try{


      if(isEditing){


        await updatePayment(
          editingId,
          payment
        );


      }else{


        await createPayment(
          payment
        );


      }



      await loadPayments();

      await loadDashboard();



      setMemberId("");

      setAmount("");

      setMonth("");

      setIsEditing(false);

      setEditingId(null);



    }catch(error){


      setError(

        error.response?.data?.detail ||

        "Ödeme işlemi başarısız."

      );


    }



  }









  async function removePayment(id){


    await deletePayment(id);


    await loadPayments();


    await loadDashboard();


  }









  function editPayment(payment){


    setMemberId(
      String(payment.member_id)
    );


    setAmount(
      String(payment.amount)
    );


    setMonth(
      payment.month
    );


    setEditingId(
      payment.id
    );


    setIsEditing(true);


  }









  return {


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


    deletePayment:
    removePayment,



    editPayment,


    isEditing,


    error,



    totalMembers,

    paidMembers,

    waitingMembers,

    totalCollected


  };


}
