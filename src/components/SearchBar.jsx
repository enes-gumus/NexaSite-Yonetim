function SearchBar({ search, setSearch }) {
  return (
    <section className="search">
      <input
        type="text"
        placeholder="Üye adı veya daire ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
}

export default SearchBar;
