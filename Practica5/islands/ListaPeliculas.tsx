import { useState } from 'preact/hooks';
import { Film } from '../types.ts';
import AddFilmModal from "./ModalPeliculas.tsx";


interface FilmListProps {
  films: Film[];
}

export default function FilmList({ films }: FilmListProps) {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const handleAddClick = (film: Film) => {
    setSelectedFilm(film);
  };

  const handleCloseModal = () => {
    setSelectedFilm(null);
  };

  return (
    <div>
      {films.map(film => (
        <div key={film.id}>
          <img src={film.image} alt={film.name} />
          <p>{film.name}</p>
          <p>{film.brand}</p>
          <p>{film.iso}</p>
          <p>{film.format}</p>
          <p>{film.color}</p>
          <button onClick={() => handleAddClick(film)}>Add to Project</button>
        </div>
      ))}
      {selectedFilm && <AddFilmModal film={selectedFilm} onClose={handleCloseModal} />}
    </div>
  );
}