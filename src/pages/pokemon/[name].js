import Image from "next/image";
import Link from "next/link";

export default function PokemonDetails({ pokemon }) {
  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/"
          className="px-4 py-3 bg-purple-600 flex max-w-max text-white rounded"
        >
          Home
        </Link>
      </div>
      <div className="max-w-[360px] mx-auto rounded overflow-hidden">
        <div className="relative w-full h-[22.5rem] bg-yellow-600">
          {/* <img className="w-full" src={pokemon.sprite} alt={pokemon.name} /> */}
          <Image src={pokemon.sprite} alt={pokemon.name} layout="fill" />
        </div>
        <div className="bg-yellow-900 p-4 text-white">
          <p className="mb-2 last:mb-0">
            <b>Name:</b> {pokemon.name}
          </p>
          <p className="mb-2 last:mb-0">
            <b>Type:</b> {pokemon.types.join(", ")}
          </p>
          <p className="mb-2 last:mb-0">
            <b>Height:</b> {pokemon.height}
          </p>
          <p className="mb-2 last:mb-0">
            <b>Weight:</b> {pokemon.weight}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const data = await res.json();
  const pokemon = {
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
  };
  return { props: { pokemon } };
}
