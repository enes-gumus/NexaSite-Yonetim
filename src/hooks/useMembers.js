import { useEffect, useState } from "react";

export default function useMembers() {
  const defaultMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      apartment: "A-12",
      phone: "05551234567",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      apartment: "B-08",
      phone: "05557654321",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      apartment: "C-15",
      phone: "05559876543",
    },
  ];

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("members");
    return saved ? JSON.parse(saved) : defaultMembers;
  });

  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  function addMember() {
    if (
      name.trim() === "" ||
      apartment.trim() === "" ||
      phone.trim() === ""
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (isEditing) {
      setMembers(
        members.map((member) =>
          member.id === editingId
            ? {
                ...member,
                name,
                apartment,
                phone,
              }
            : member
        )
      );

      setIsEditing(false);
      setEditingId(null);
    } else {
      setMembers([
        ...members,
        {
          id: Date.now(),
          name,
          apartment,
          phone,
        },
      ]);
    }

    setName("");
    setApartment("");
    setPhone("");
  }

  function deleteMember(id) {
    setMembers(members.filter((member) => member.id !== id));
  }

  function editMember(member) {
    setName(member.name);
    setApartment(member.apartment);
    setPhone(member.phone);

    setEditingId(member.id);
    setIsEditing(true);
  }

  const filteredMembers = members.filter((member) => {
    const text = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(text) ||
      member.apartment.toLowerCase().includes(text)
    );
  });

  return {
    members: filteredMembers,

    name,
    setName,

    apartment,
    setApartment,

    phone,
    setPhone,

    search,
    setSearch,

    addMember,
    deleteMember,
    editMember,

    isEditing,
  };
}
