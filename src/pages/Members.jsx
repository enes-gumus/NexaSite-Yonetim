import MemberForm from "../components/members/MemberForm";
import MemberTable from "../components/members/MemberTable";
import SearchBar from "../components/SearchBar";

import useMembers from "../hooks/useMembers";

function Members() {
  const {
    members,

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
  } = useMembers();

  return (
    <>
      <h1>Üye Yönetimi</h1>

      <MemberForm
        name={name}
        setName={setName}
        apartment={apartment}
        setApartment={setApartment}
        phone={phone}
        setPhone={setPhone}
        addMember={addMember}
        isEditing={isEditing}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MemberTable
        members={members}
        deleteMember={deleteMember}
        editMember={editMember}
      />
    </>
  );
}

export default Members;
