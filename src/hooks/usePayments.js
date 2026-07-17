import { useEffect, useState } from "react";

export default function usePayments() {
  const [fee, setFee] = useState(500);

  const defaultPayments = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      apartment: "A-12",
      amount: 500,
      date: "20.07.2026",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      apartment: "B-08",
      amount: 500,
      date: "19.07.2026",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      apartment: "C-15",
      amount: 500,
      date: "18.07.2026",
    },
  ];

  const [payments, setPayments] = useState(() => {
    const savedPayments = localStorage.getItem("payments");

    return savedPayments ? JSON.parse(savedPayments) : defaultPayments;
  });

  const [memberName, setMemberName] = useState("");
  const [apartment, setApartment] = useState("");
  const [amount, setAmount] = useState("");

  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  function addPayment() {
    if (
      memberName.trim() === "" ||
      apartment.trim() === "" ||
      amount.trim() === ""
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (isEditing) {
      setPayments(
        payments.map((payment) =>
          payment.id === editingId
            ? {
                ...payment,
                name: memberName,
                apartment,
                amount: Number(amount),
              }
            : payment
        )
      );

      setIsEditing(false);
      setEditingId(null);
    } else {
      setPayments([
        ...payments,
        {
          id: Date.now(),
          name: memberName,
          apartment,
          amount: Number(amount),
          date: new Date().toLocaleDateString("tr-TR"),
        },
      ]);
    }

    setMemberName("");
    setApartment("");
    setAmount("");
  }

  function deletePayment(id) {
    setPayments(payments.filter((payment) => payment.id !== id));
  }

  function editPayment(payment) {
    setMemberName(payment.name);
    setApartment(payment.apartment);
    setAmount(String(payment.amount));
    setEditingId(payment.id);
    setIsEditing(true);
  }

  const filteredPayments = payments.filter((payment) => {
    const text = search.toLowerCase();

    return (
      payment.name.toLowerCase().includes(text) ||
      payment.apartment.toLowerCase().includes(text)
    );
  });

  const totalMembers = 5000;
  const paidMembers = payments.length;
  const waitingMembers = totalMembers - paidMembers;

  const totalCollected = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  return {
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

    payments: filteredPayments,

    totalMembers,
    paidMembers,
    waitingMembers,
    totalCollected,

    addPayment,
    deletePayment,
    editPayment,

    isEditing,
  };
}
