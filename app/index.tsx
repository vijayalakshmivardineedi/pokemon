// pages/index.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch the first 151 Pokémon
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => setPokemonList(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  // Filter based on search query
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokemon Explorer</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="border p-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon, index) => {
          // Extract id from URL: pokeapi urls typically end with /:id/
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return (
            <Link key={pokemon.name} href={`/pokemon/${id}`}>
              <a className="border p-4 rounded hover:shadow-lg transition-shadow">
                <h2 className="capitalize font-semibold">{pokemon.name}</h2>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
