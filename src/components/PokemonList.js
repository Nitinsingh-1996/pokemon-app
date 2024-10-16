import PokemonCard from './PokemonCard';
import Link from 'next/link';

const PokemonList = ({ pokemons }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {pokemons.map((p) => (
      <Link href={`/pokemon/${p.name}`} key={p.name}>
        <PokemonCard pokemon={p} />
      </Link>
    ))}
  </div>
);

export default PokemonList;
