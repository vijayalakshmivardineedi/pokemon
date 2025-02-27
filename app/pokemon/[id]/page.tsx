import { notFound } from "next/navigation";

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

interface PokemonPageProps {
  params: { id: string };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await getPokemon(params.id);
  if (!pokemon) {
    return notFound();
  }
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <header className="bg-red-600 py-4 shadow mb-8">
        <h1 className="text-center text-3xl font-bold text-white capitalize">
          {pokemon.name}
        </h1>
      </header>
      <section className="container mx-auto flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 object-contain mb-4"
        />
        <div className="mb-4">
          <strong className="text-red-600">Types:</strong>{" "}
          {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </div>
        <div className="mb-4">
          <strong className="text-red-600">Abilities:</strong>{" "}
          {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
        </div>
        
      </section>
    <section className="container mx-auto flex flex-wrap justify-center items-start gap-10 px-10 py-10">
  <div className="mb-4 w-1/3">
    <h2 className="text-xl font-semibold text-red-600">Stats</h2>
    <ul className="space-y-1 p-0 m-0">
      {pokemon.stats.map((s: any) => (
        <li key={s.stat.name} className="leading-tight">
          {s.stat.name}: {s.base_stat}
        </li>
      ))}
    </ul>
  </div>

  <div className="mb-4 w-1/3">
    <h2 className="text-xl font-semibold text-red-600">Moves</h2>
    <ul className="max-h-32 overflow-y-scroll  p-0 m-0 leading-tight">
      {pokemon.moves.map((m: any) => (
        <li key={m.move.name} className="capitalize">
          {m.move.name}
        </li>
      ))}
    </ul>
  </div>
</section>


    </main>
  );
}
   