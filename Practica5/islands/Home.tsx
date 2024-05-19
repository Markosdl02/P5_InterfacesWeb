import { useState } from 'preact/hooks';
import { Film } from '../types.ts';
import FilterFilms from './Filtros.tsx';
import FilmList from './ListaPeliculas.tsx';

type HomeProps = {
  films: Film[];
}

export default function Home({ films }: HomeProps) {
  const [filteredFilms, setFilteredFilms] = useState<Film[]>(films);

  return (
    <div>
      <FilterFilms films={films} onFilter={setFilteredFilms} />
      <FilmList films={filteredFilms} />
    </div>
  );
}