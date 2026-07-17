function MemberForm({
  name,
  setName,
  apartment,
  setApartment,
  phone,
  setPhone,
  addMember,
  isEditing,
}) {
  return (
    <section className="form">
      <input
        type="text"
        placeholder="Üye Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Daire No"
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
      />

      <input
        type="text"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addMember}>
        {isEditing ? "Kaydet" : "Üye Ekle"}
      </button>
    </section>
  );
}

export default MemberForm;
