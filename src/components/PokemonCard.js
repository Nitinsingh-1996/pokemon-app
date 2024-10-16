

const PokemonCard = ({ pokemon }) => (
  <div className="card p-4 shadow-md">
    <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
    <p>{pokemon.name}</p>
  </div>
);

export default PokemonCard;
