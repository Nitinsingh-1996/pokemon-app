import PropTypes from "prop-types";

const PokemonCard = ({ pokemon }) => (
  <div className="card p-4 shadow-md bg-slate-100 flex flex-col justify-center items-center gap-4">
    <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
    <p className="font-semibold">{pokemon.name}</p>
  </div>
);

export default PokemonCard;
PokemonCard.propTypes = {
  pokemon: PropTypes.object,
};
