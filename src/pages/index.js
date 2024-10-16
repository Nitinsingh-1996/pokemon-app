import { useState, useEffect } from "react";
import PokemonFilter from "../components/PokemonFilter";
import PokemonList from "../components/PokemonList";

export async function getServerSideProps() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const types = await res.json();
  return { props: { types: types.results } };
}

export default function Home({ types }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            type: details.types.map((t) => t.type.name).join(", "),
          };
        })
      );
      setPokemons(pokemonDetails);
      setFilteredPokemons(pokemonDetails);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonsByType = async () => {
      if (!type) {
        setFilteredPokemons(pokemons);
        return;
      }

      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      const pokemonByType = await Promise.all(
        data.pokemon.map(async (pokemonData) => {
          const res = await fetch(pokemonData.pokemon.url);
          const details = await res.json();
          return {
            name: pokemonData.pokemon.name,
            image: details.sprites.front_default,
            type: details.types.map((t) => t.type.name).join(", "),
          };
        })
      );
      setFilteredPokemons(pokemonByType);
    };

    fetchPokemonsByType();
  }, [type, pokemons]);

  const searchedPokemons = filteredPokemons.filter((p) =>
    p.name.includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Pokémon Search</h1>
      <PokemonFilter
        types={types}
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />
      <PokemonList pokemons={searchedPokemons} />
    </div>
  );
}
