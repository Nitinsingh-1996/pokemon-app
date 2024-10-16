import { Close } from "@/assets/iconSVG";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";

export default function PokemonDetails({ pokemon }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowAll = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
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
          <p className="mb-2 last:mb-0 flex gap-x-1">
            {console.log(pokemon.allData, "allData")}
            {console.log(pokemon.stat, "allData stat")}
            <b className="min-w-[70px]">Name:</b> {pokemon.name}
          </p>
          <p className="mb-2 last:mb-0 flex gap-x-1">
            <b className="min-w-[70px]">Type:</b> {pokemon.types.join(", ")}
          </p>
          <div className="mb-2 last:mb-0 flex gap-x-1">
            <b className="min-w-[70px]">stat:</b>{" "}
            <div className="flex gap-1 justify-start flex-wrap">
              {pokemon.stat.map((items, index) => (
                <>
                  <span className="whitespace-nowrap" key={index + 1}>
                    {items.stat.name}
                  </span>
                  <span className="last:hidden">,</span>
                </>
              ))}
            </div>
          </div>
          <div className="mb-2 last:mb-0 flex gap-x-1">
            <b className="min-w-[70px]">abilities:</b>{" "}
            <div className="flex gap-1 justify-start flex-wrap">
              {pokemon.abilities.map((items, index) => (
                <>
                  <span className="whitespace-nowrap" key={index + 1}>
                    {items.ability.name}
                  </span>
                  <span className="last:hidden">,</span>
                </>
              ))}
            </div>
          </div>
          <div className="mb-2 last:mb-0 flex gap-x-1">
            <b className="min-w-[70px]">moves:</b>{" "}
            <div className="flex gap-1 justify-start flex-wrap">
              {pokemon.moves.slice(0, 5).map((items, index) => (
                <>
                  <span className="whitespace-nowrap" key={index + 1}>
                    {items.move.name}
                  </span>
                  <span className="last:hidden">,</span>
                </>
              ))}
              {pokemon.moves.length > 5 && (
                <button onClick={handleShowAll} className="bg-white px-2 text-black hover:bg-black hover:text-white transition-all">...</button>
              )}
              {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 max-h-[400px] w-[540px] m-auto bg-slate-400 rounded-xl p-6 pt-14 text-black">
                  <div className="overflow-auto h-full">
                    <h3 className="absolute top-3 left-3 font-semibold">All Map Values</h3>
                    <ul>
                      {pokemon.moves.map((items, index) => (
                        <li key={index + 1} className="bg-slate-100 p-2 mb-1">{items.move.name}</li>
                      ))}
                    </ul>
                    <button className="absolute right-3 top-3" onClick={handleCloseModal}>
                      <Close/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${params.name}`);
  const data = await res.json();
  const pokemon = {
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    allData: data,
    stat: data.stats,
    abilities: data.abilities,
    moves: data.moves,
  };
  return { props: { pokemon } };
}

PokemonDetails.propTypes = {
  pokemon: PropTypes.object,
};
