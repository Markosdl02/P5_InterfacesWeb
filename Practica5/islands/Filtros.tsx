import { useState } from 'preact/hooks';
import { Film } from '../types.ts';

type FilterFilmsProps = {
  films: Film[];
  onFilter: (filteredFilms: Film[]) => void;
}

export default function FilterFilms({ films, onFilter }: FilterFilmsProps) {
  const [filters, setFilters] = useState({
    brand: '',
    iso: '',
    format: '',
    color: '',
    name: ''
  });

  const handleFilterChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const newFilters = { ...filters, [target.name]: target.value };
    setFilters(newFilters);

    const filteredFilms = films.filter(film => {
      return Object.entries(newFilters).every(([key, value]) =>
        value ? film[key as keyof Film].toString().includes(value.toString()) : true
      );
    });

    onFilter(filteredFilms);
  };

  const brands = [...new Set(films.map(film => film.brand))];
  const isos = [...new Set(films.map(film => film.iso))];
  const formats = [...new Set(films.map(film => film.format))];
  const colors = ['Color', 'Black & White'];

  return (
    <div>
      <select name="brand" onChange={handleFilterChange}>
        <option value="">Select Brand</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select>
      <select name="iso" onChange={handleFilterChange}>
        <option value="">Select ISO</option>
        {isos.map(iso => <option key={iso} value={iso}>{iso}</option>)}
      </select>
      <select name="format" onChange={handleFilterChange}>
        <option value="">Select Format</option>
        {formats.map(format => <option key={format} value={format}>{format}</option>)}
      </select>
      <select name="color" onChange={handleFilterChange}>
        <option value="">Select Color</option>
        {colors.map(color => <option key={color} value={color}>{color}</option>)}
      </select>
      <input 
        type="text" 
        name="name" 
        placeholder="Filter by name" 
        onChange={handleFilterChange} 
      />
    </div>
  );
}
