"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import downloadImg from "./imgs/download.png"; 
import Image from "next/image"; 


interface Pokemon {
  name: string;
  url: string;
}

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results))
      .catch((err) => console.error("Error fetching Pokemon:", err));
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="h-screen flex flex-col bg-gray-50">
     
     <header className="bg-red-500 py-6 shadow fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6">
  <Image src={downloadImg} alt="Pokemon Logo" width={100} height={100} />
  <h1 className="text-4xl font-bold text-white">Pokemon Explorer</h1>
</header>

      <section className="flex-1 overflow-auto mt-24 mb-16 container mx-auto px-5 py-5">
      
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded border border-gray-300 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredPokemon.map((pokemon) => {
              const segments = pokemon.url.split("/").filter(Boolean);
              const id = segments[segments.length - 1];
              return (
                <Link key={pokemon.name} href={`/pokemon/${id}`}>
                  <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow transition-transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-center">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={pokemon.name}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <h2 className="mb-2 text-center text-xl font-semibold capitalize text-gray-800">
                      {pokemon.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">
            No Pokemon found.
          </p>
        )}
      </section>

      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600 fixed bottom-0 left-0 w-full z-10">
        @ {new Date().getFullYear()} Pokemon Explorer. All rights reserved.
      </footer>
    </main>
  );
}