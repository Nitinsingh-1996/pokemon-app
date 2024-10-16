const PokemonFilter = ({ types, search, setSearch, type, setType }) => (
    <form className="flex flex-col gap-4 mb-6">
      <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border">
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon"
        className="p-2 border"
      />
    </form>
  );
  
  export default PokemonFilter;
  