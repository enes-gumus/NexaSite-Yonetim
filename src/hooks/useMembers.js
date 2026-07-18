import { useEffect, useState } from "react";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../services/memberService";


export default function useMembers() {

  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);


  async function loadMembers() {
    try {
      const data = await getMembers();
      setMembers(data);

    } catch (error) {
      console.error(
        "Üyeler yüklenemedi:",
        error.response?.data || error.message
      );
    }
  }


  useEffect(() => {
    loadMembers();
  }, []);



  async function addMember() {

    if (
      name.trim() === "" ||
      apartment.trim() === "" ||
      phone.trim() === ""
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }


    const member = {
      name: name,
      apartment: apartment,
      phone: phone,
    };


    try {

      if (isEditing) {

        await updateMember(
          editingId,
          member
        );

        setEditingId(null);
        setIsEditing(false);

      } else {

        await createMember(member);

      }


      await loadMembers();


      setName("");
      setApartment("");
      setPhone("");


    } catch (error) {

      console.error(
        "ÜYE EKLEME HATASI:",
        error.response?.data || error.message
      );


      alert(
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    }
  }



  async function removeMember(id) {

    try {

      await deleteMember(id);

      await loadMembers();

    } catch (error) {

      console.error(
        "Silme hatası:",
        error.response?.data || error.message
      );

    }
  }



  function editMember(member) {

    setName(member.name);
    setApartment(member.apartment);
    setPhone(member.phone);

    setEditingId(member.id);
    setIsEditing(true);

  }



  const filteredMembers = members.filter(
    (member) => {

      const text = search.toLowerCase();

      return (
        member.name
          .toLowerCase()
          .includes(text)
        ||
        member.apartment
          .toLowerCase()
          .includes(text)
      );

    }
  );



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

    deleteMember: removeMember,

    editMember,

    isEditing,

  };

}
