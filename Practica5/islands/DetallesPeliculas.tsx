import { useEffect, useState } from 'preact/hooks';
import { fetchFilms } from "../routes/api/APIpeliculas.ts";
import { Film } from '../types.ts';

type FilmDetailProps = {
  params: { id: string };
}

export default function FilmDetail({ params }: FilmDetailProps) {
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetchFilms().then((films: Film[]) => {
      const film = films.find((f) => f.id === params.id);
      setFilm(film || null);
    });
  }, [params.id]);

  if (!film) return <p>Loading...</p>;

  return (
    <div>
      <h1>{film.name}</h1>
      <img src={film.image} alt={film.name} />
    </div>
  );
}